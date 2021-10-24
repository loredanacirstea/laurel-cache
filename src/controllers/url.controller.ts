import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response,
  Response, RestBindings
} from '@loopback/rest';
import {Url} from '../models';
import {UrlRepository} from '../repositories';
const axios = require('axios').default;

export class UrlController {
  constructor(
    @repository(UrlRepository) public urlRepository: UrlRepository,
    @inject(RestBindings.Http.RESPONSE) private res: Response,
  ) { }

  @post('/url')
  @response(200, {
    description: 'Url model instance',
    content: {'application/json': {schema: getModelSchemaRef(Url)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Url, {
            title: 'NewUrl',
            exclude: ['id'],
          }),
        },
      },
    })
    url: Omit<Url, 'id'>,
  ): Promise<Url> {
    return this.urlRepository.create(url);
  }

  @get('/url/count')
  @response(200, {
    description: 'Url model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Url) where?: Where<Url>,
  ): Promise<Count> {
    return this.urlRepository.count(where);
  }

  @get('/url')
  @response(200, {
    description: 'Array of Url model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Url, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Url) filter?: Filter<Url>,
  ): Promise<Url[]> {
    return this.urlRepository.find(filter);
  }

  @patch('/url')
  @response(200, {
    description: 'Url PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Url, {partial: true}),
        },
      },
    })
    url: Url,
    @param.where(Url) where?: Where<Url>,
  ): Promise<Count> {
    return this.urlRepository.updateAll(url, where);
  }

  @get('/url/{id}')
  @response(200, {
    description: 'Url model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Url, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Url, {exclude: 'where'}) filter?: FilterExcludingWhere<Url>
  ): Promise<Url> {
    return this.urlRepository.findById(id, filter);
  }

  @patch('/url/{id}')
  @response(204, {
    description: 'Url PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Url, {partial: true}),
        },
      },
    })
    url: Url,
  ): Promise<void> {
    await this.urlRepository.updateById(id, url);
  }

  @put('/url/{id}')
  @response(204, {
    description: 'Url PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() url: Url,
  ): Promise<void> {
    await this.urlRepository.replaceById(id, url);
  }

  @del('/url/{id}')
  @response(204, {
    description: 'Url DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.urlRepository.deleteById(id);
  }

  @get('/url-cache/{url}')
  @response(200, {
    description: 'Url model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Url, {includeRelations: true}),
      },
    },
  })
  async findAndCacheByUrl(
    @param.path.string('url') url: string,
  ): Promise<Response> {
    const decodedUrl = decodeURIComponent(url);
    let record = await this.urlRepository.findOne({where: {url: decodedUrl}});

    if (!record) {
      let page;
      try {
        page = await axios.get(decodedUrl);
      } catch (e) {
        this.res.status(409);
        return this.res;
      }
      const date = new Date();
      const data = {
        id: (date.getTime() + decodedUrl).slice(0, 64),
        createdAt: date,
        url: decodedUrl,
        headers: page.headers,
        content: page.data,
      }
      if (typeof data.content !== 'string') data.content = JSON.stringify(data.content);
      record = await this.urlRepository.create(data);
    }

    for (const header in record.headers) {
      const value = record.headers[header];
      if (!value) continue;
      this.res.setHeader(header, value);
    }

    this.res.status(200).send(record.content);
    return this.res;

  }
}
