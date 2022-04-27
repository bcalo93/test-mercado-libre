import { Router } from 'express'
import ItemController from './itemController.js'

const router = Router()
const itemController = new ItemController()

router.get('/items', itemController.getItems.bind(itemController))

router.get('/items/:id', itemController.getItemById.bind(itemController))

export default router
