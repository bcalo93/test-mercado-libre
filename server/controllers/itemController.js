import fetch from 'node-fetch'
import HttpError from '../errors/httpError.js'

const API_DOMAIN = 'https://api.mercadolibre.com'
const SEARCH_API_URL = `${API_DOMAIN}/sites/MLA/search?limit=4&q=`

export default class ItemController {
  async getItems(req, res, next) {
    const { search } = req.query
    if (!search) {
      next(new HttpError('search param is missing', 400))
      return
    }

    try {
      const { results } = await this.makeRequest(`${SEARCH_API_URL}${search}`)
      const categoryId = this.getMostRelevantCategory(results)

      res.json({
        categories: await this.fetchCategoryData(categoryId),
        items: results.map(this.normalizeSearchProps.bind(this)),
      })

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
    const itemApiUrl = `${API_DOMAIN}/items/${id}`
    try {
      const [item, itemDescription] = await Promise.all([
        this.makeRequest(itemApiUrl),
        this.makeRequest(`${itemApiUrl}/description`),
      ])

      res.json({
        item: {
          ...this.normalizeItemProps(item, itemDescription),
          categories: await this.fetchCategoryData(item.category_id),
        },
      })

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

  getMostRelevantCategory(items) {
    let mostRelevant = items[0]?.category_id
    let maxCount = 1
    const categoryMap = {}
    items.forEach((item) => {
      const currentCategory = item.category_id
      if (!categoryMap[currentCategory]) {
        categoryMap[currentCategory] = 1
      } else {
        categoryMap[currentCategory]++
      }

      if (categoryMap[currentCategory] > maxCount) {
        mostRelevant = currentCategory
        maxCount = categoryMap[currentCategory]
      }
    })

    return mostRelevant
  }

  async fetchCategoryData(categoryId) {
    const { path_from_root } = await this.makeRequest(
      `${API_DOMAIN}/categories/${categoryId}`
    )
    return this.normalizeCategories(path_from_root)
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

  normalizeCategories(pathFromRoot) {
    return pathFromRoot.map((category) => category.name)
  }
}
