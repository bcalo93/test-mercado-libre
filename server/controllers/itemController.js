import fetch from 'node-fetch'

const SEARCH_API_URL =
  'https://api.mercadolibre.com/sites/MLA/search?limit=4&q='

export default class ItemController {
  async getItems(req, res, next) {
    const { search } = req.query
    if (!search) {
      throw new Error('search param is missing')
    }

    res.json(await this.makeRequest(`${SEARCH_API_URL}${search}`))
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
      })),
    }
  }
}
