import {
  repository
} from '@loopback/repository';
import {get, getModelSchemaRef, param, post, response} from '@loopback/rest';
import {evmjs, utils} from 'ewasm-jsvm';
import {Contract, State} from '../models';
import {StateRepository} from '../repositories';
import {ContractController} from './contract.controller';
import {TransactionController} from './transaction.controller';
const BN = require('bn.js');
const {ethers} = require('ethers');
const fs = require('fs');

interface StateSnapshot {
  [key: string]: string;
}

export class StateExecuteController {
  constructor(
    @repository(StateRepository)
    public stateRepository: StateRepository,
  ) { }

  @get('/state-execute/{contractId}/{blockNumber}')
  @response(200, {
    description: 'Array of State model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(State, {includeRelations: true}),
        },
      },
    },
  })
  async snapshot(
    @param.path.number('contractId') contractId: string,
    @param.path.number('blockNumber') blockNumberLimit: string,
  ): Promise<object> {
    const snapshot: StateSnapshot = {};
    const states = await this.stateRepository.find({
      where: {
        and: [
          {contractId},
          {blockNumber: {lt: (parseInt(blockNumberLimit) + 1).toString(10)}},
        ]
      },
      order: ['blockNumber ASC', 'transactionIndex ASC']
    });
    console.log('snapshot states', states.length);
    states.forEach((state: State) => {
      snapshot[state.key] = state.value;
    });
    return snapshot;
  }

  @post('/state-execute/{contractId}/{blockNumber}')
  @response(200, {
    description: 'Execute block',
  })
  async execute(
    @param.path.number('contractId') contractId: string,
    @param.path.number('blockNumber') blockNumberLimit: string,
  ): Promise<void> {
    const transactionRepository = await this.stateRepository.transactionRepository;
    const contractRepository = await this.stateRepository.contractRepository;

    const transactionController = new TransactionController(transactionRepository);
    const contractController = new ContractController(contractRepository);

    const contract = await contractController.findById(contractId);
    if (!contract) return;
    const {address, balance, bytecode, chainid} = contract;

    const evmrunner = evmjs({});
    let storedStates = [];
    let blockNumber;
    let storage: any = {};
    const bmin = parseInt(contract.lastExecutedBlock) + 1;
    const bmax = parseInt(blockNumberLimit);

    const storageFile = await getStorageFile();
    if (storageFile) {
      storage = JSON.parse(storageFile);
    }
    else {
      const states = await this.stateRepository.find({where: {contractId}, order: ['blockNumber ASC', 'transactionIndex ASC']});
      console.log('states', states.length);
      states.forEach(state => {
        storage[state.key] = state.value;
      })
    }

    const accounts = {
      [address]: {address, balance, storage: {...storage}, runtimeCode: bytecode}
    }

    for (blockNumber = bmin; blockNumber <= bmax; blockNumber++) {
      console.log('-blockNumber', blockNumber);
      const txs = await transactionController.find({
        where: {
          and: [
            {block_number: blockNumber.toString()},
            {receiptStatus: 1},
          ]
        },
        order: ['transactionIndex ASC'],
      });

      console.log('txs', txs.length);

      for (const transaction of txs) {
        const {value, input, gas, gasPrice, hash, block_number, transactionIndex} = transaction;
        let {fromAddress} = transaction;
        fromAddress = ethers.utils.getAddress(fromAddress);

        let fromAccount: any = accounts[fromAddress];
        if (!fromAccount) {
          const account = (await contractController.find({where: {address: fromAddress, chainid}}))[0];
          if (!account) {
            // FIXME - not general for cache, but we don't need more
            fromAccount = {
              address: fromAddress,
              balance: '0x0000000000000000000000000000000000000000000000000000000000000000',
            }
          }
          else {
            fromAccount = accounts[fromAddress] = {
              address: account.address,
              balance: account.balance,
              runtimeCode: account.bytecode,
              storage: {},
            };
          }
        }

        const currentAccounts = {
          [address]: {address, balance, storage: {...storage}, runtimeCode: bytecode},
          [fromAddress]: {...fromAccount},
        }

        evmrunner.setContext({accounts: {...currentAccounts}});
        const runtime = await evmrunner.runtimeSim(bytecode, [], address);

        const tx = {
          data: input,
          value: new BN(value, 10),
          from: fromAddress,
          to: address,
          gasLimit: (new BN(gas, 10)).addn(1000000),
          gasPrice: new BN(gasPrice, 10),
        };
        console.log('tx', address, tx);

        // This needs to throw if there is an error
        await runtime.mainRaw(tx);
        console.log('logs count', runtime.logs.length);

        const {context} = runtime.logs[runtime.logs.length - 1];
        for (const addr in context) {
          if (!currentAccounts[addr]) {
            console.warn(`Unknown account touched: ${addr}`);
            continue;
          }
          let acc: any = (await contractController.find({where: {address: addr.toLowerCase(), chainid}}))[0];
          if (!acc) {
            console.warn(`Unknown account touched (db): ${addr}`);
            acc = {
              id: '',
              address: addr.toLowerCase(),
              balance: '0',
              bytecode: '',
              constructorArgs: '',
              compiledBytecode: '',
              functionSighashes: [],
              chainid,
              lastExecutedBlock: 0,
              abi: [],
            }
          }

          // Update balance if needed
          // const b: string = context[addr].balance.toString(10);
          // console.log(currentAccounts[addr].balance, b);
          // if (currentAccounts[addr].balance !== b) {
          //   acc.balance = b;
          //   await contractController.contractRepository.update(acc);
          // }

          // Update states
          context[addr].storage = context[addr].storage || {};
          for (const keyaddr in context[addr].storage) {
            const val = utils.uint8ArrayToHex(context[addr].storage[keyaddr]);
            // if same value, pass
            if (val === storage[keyaddr]) continue;
            // if value is 0 and it was unset before, pass
            if (!storage[keyaddr] && val === '0x0000000000000000000000000000000000000000000000000000000000000000') continue;
            const newState = {
              key: keyaddr,
              value: val,
              lastModifiedTx: hash,
              contractId: acc.id,
              transactionIndex,
              blockNumber: block_number,
            }
            storedStates.push(newState);
            // keep a cache of the last state
            storage[keyaddr] = val;
          }
        }
      }

      // Insert states after each block
      await this.stateRepository.createAll(storedStates);
      storedStates = [];

      // Update last executed block
      const newContract: Contract = Object.assign({}, contract, {lastExecutedBlock: blockNumber});
      await contractController.updateById(contract.id, newContract);
      await saveStorageFile(storage);
    }
  }
}

function getStorageFile() {
  return fs.promises.readFile('./statecache.json').catch((e: Error) => null);
}

function saveStorageFile(stateObj: any) {
  return fs.promises.writeFile('./statecache.json', JSON.stringify(stateObj));
}
