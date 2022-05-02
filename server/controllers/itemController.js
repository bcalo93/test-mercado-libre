import fetch from 'node-fetch'
import HttpError from '../errors/httpError.js'

const API_DOMAIN = 'https://api.mercadolibre.com'
const SEARCH_API_URL = `${API_DOMAIN}/sites/MLA/search?limit=4&q=`

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

const DUMMY_DETAILS = {
  item: {
    id: 'MLA1116769053',
    title: 'Apple iPhone SE (2da Generación) 128 Gb - (product)red',
    price: {
      currency: 'ARS',
      amount: 138513,
    },
    picture: 'http://http2.mlstatic.com/D_607789-MLA46552310113_062021-I.jpg',
    free_shipping: true,
    condition: 'new',
    sold_quantity: 5,
    description:
      'El iPhone SE es el iPhone de 4,7 pulgadas más potente hasta ahora (1). Tiene el chip A13 Bionic, que ofrece un rendimiento increíble en apps, juegos y fotos. Viene con modo Retrato y seis efectos de iluminación para tomar retratos con calidad de estudio, HDR Inteligente de última generación que ofrece un nivel de detalle sorprendente en las luces y las sombras de las fotos, video 4K de calidad cinematográfica y todas las funcionalidades avanzadas de iOS. Además de una batería de larga duración (2) y resistencia al agua (3). Tiene todo lo que te gusta del iPhone en un diseño compacto que te encantará.\n\n\nAvisos Legales\n(1) El tamaño de la pantalla se mide en diagonal.\n(2) La duración de la batería varía según el uso y la configuración.\n(3) El iPhone SE es resistente a las salpicaduras, al agua y al polvo, y fue probado en condiciones de laboratorio controladas; el iPhone SE tiene una clasificación IP67 según la norma IEC 60529 (hasta 30 minutos a una profundidad máxima de 1 metro). La resistencia a las salpicaduras, al agua y al polvo no es una condición permanente, y podría disminuir como consecuencia del uso normal. No intentes cargar un iPhone mojado; consulta el manual del usuario para ver las instrucciones de limpieza y secado. La garantía no cubre daños producidos por líquidos.\n(4) Los cargadores inalámbricos Qi se venden por separado.',
    categories: ['Celulares y Teléfonos', 'Celulares y Smartphones'],
  },
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
      // res.json({
      //   items: results.map(this.normalizeSearchProps.bind(this)),
      // })

      // TODO: DELETE
      res.json(DUMMY)
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
      // const [item, itemDescription] = await Promise.all([
      //   this.makeRequest(itemApiUrl),
      //   this.makeRequest(`${itemApiUrl}/description`),
      // ])

      // const { path_from_root } = await this.makeRequest(`${API_DOMAIN}/categories/${item.category_id}`)
      // res.json({ item: { ...this.normalizeItemProps(item, itemDescription), categories: this.normalizeCategories(path_from_root) } })

      res.json(DUMMY_DETAILS)
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

  normalizeCategories(pathFromRoot) {
    return pathFromRoot.map(({ name }) => name)
  }
}
