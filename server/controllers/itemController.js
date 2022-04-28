import fetch from 'node-fetch'

const SEARCH_API_URL =
  'https://api.mercadolibre.com/sites/MLA/search?limit=4&q='

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
      throw new Error('search param is missing')
    }

    //res.json(await this.makeRequest(`${SEARCH_API_URL}${search}`))

    // TODO: DELETE
    res.json(DUMMY)
    next()
  }

  async getItemById(req, res, next) {
    throw new Error('not implemented')
  }

  async makeRequest(url) {
    const response = await fetch(url)
    if (response.status !== 200) {
      throw new Error('something went wrong')
    }

    return this.normalizeData(await response.json())
  }

  normalizeData({ results }) {
    return {
      items: results.map((item) => ({
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
        },
        picture: item.thumbnail,
        free_shipping: item.shipping.free_shipping,
        address: {
          state: item.address.state_name,
        },
      })),
    }
  }
}
