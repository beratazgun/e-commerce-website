import { Router } from 'express'
import CartController from '../controllers/cart.controller'
import Auth from '../controllers/auth/Auth'

const router: Router = Router()
const cartController: CartController = new CartController()
const auth = new Auth('')

router.post('/add', auth.isLoggedIn, cartController.addToCart)
router.get('/get', auth.isLoggedIn, cartController.getCart)
router.get('/get/count', auth.isLoggedIn, cartController.getItemCounts)
router.delete('/delete', auth.isLoggedIn, cartController.deleteFromCart)

export default router
