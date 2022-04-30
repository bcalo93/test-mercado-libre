import fetch from 'node-fetch'
import HttpError from '../errors/httpError.js'

const SEARCH_API_URL =
  'https://api.mercadolibre.com/sites/MLA/search?limit=4&q='

const ITEMS_API_URL = 'https://api.mercadolibre.com/items'

// TODO DELETE
const DUMMY = {
  items: [
    {
      id: 'MLA1116769053',
      title: 'Apple iPhone SE (2da Generación) 128 Gb - (product)red',
      price: {
        currency: 'ARS',
        amount: 138711,
      },
      picture: 'http://http2.mlstatic.com/D_607789-MLA46552310113_062021-I.jpg',
      free_shipping: true,
      address: {
        state: 'Capital Federal',
      },
    },
    {
      id: 'MLA1131283044',
      title: 'Apple iPhone 12 (128 Gb) - Blanco',
      price: {
        currency: 'ARS',
        amount: 222566,
      },
      picture: 'http://http2.mlstatic.com/D_850683-MLA45716800336_042021-I.jpg',
      free_shipping: true,
      address: {
        state: 'Capital Federal',
      },
    },
    {
      id: 'MLA1130313467',
      title: 'Apple iPhone 11 (64 Gb) - Negro',
      price: {
        currency: 'ARS',
        amount: 157464,
      },
      picture: 'http://http2.mlstatic.com/D_656548-MLA46114829749_052021-I.jpg',
      free_shipping: true,
      address: {
        state: 'Buenos Aires',
      },
    },
    {
      id: 'MLA931449399',
      title: 'Apple iPhone 11 (128 Gb) - Negro',
      price: {
        currency: 'ARS',
        amount: 178216,
      },
      picture: 'http://http2.mlstatic.com/D_865864-MLA46114990464_052021-I.jpg',
      free_shipping: true,
      address: {
        state: 'Capital Federal',
      },
    },
  ],
}

export default class ItemController {
  async getItems(req, res, next) {
    const { search } = req.query
    if (!search) {
      next(new HttpError('search param is missing', 400))
      return
    }

    try {
      const { results } = await this.makeRequest(`${SEARCH_API_URL}${search}`)
      res.json({
        items: results.map(this.normalizeSearchProps.bind(this)),
      })

      // TODO: DELETE
      //res.json(DUMMY)
      next()
    } catch (error) {
      next(error)
    }
  }

  async getItemById(req, res, next) {
    const { id } = req.params
    if (!id) {
      next(new HttpError('missing id in the path', 400))
      return
    }

    try {
      const [item, itemDescription] = await Promise.all([
        this.makeRequest(`${ITEMS_API_URL}/${id}`),
        this.makeRequest(`${ITEMS_API_URL}/${id}/description`),
      ])
      res.json({ item: this.normalizeItemProps(item, itemDescription) })
      next()
    } catch (error) {
      next(error)
    }
  }

  async makeRequest(url) {
    const response = await fetch(url)
    const result = await response.json()
    if (!response.ok) {
      throw new HttpError(result.message, response.status)
    }

    return result
  }

  normalizeCommonProps(item) {
    return {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
      },
      picture: item.thumbnail,
      free_shipping: item.shipping.free_shipping,
    }
  }

  normalizeSearchProps(item) {
    return {
      ...this.normalizeCommonProps(item),
      address: {
        state: item.address.state_name,
      },
    }
  }

  normalizeItemProps(item, { plain_text }) {
    return {
      ...this.normalizeCommonProps(item),
      condition: item.condition,
      sold_quantity: item.sold_quantity,
      description: plain_text,
    }
  }
}
