import { Router } from 'express'
import Auth from '../controllers/auth/Auth'
import OrderController from '../controllers/order.controller'

const router: Router = Router()
const auth: Auth = new Auth('')
const orderController: OrderController = new OrderController()

router.post('/create', auth.isLoggedIn, orderController.createOrder)
router.post('/cancel/:id', auth.isLoggedIn, orderController.cancelOrder)

router.get('/my-orders', auth.isLoggedIn, orderController.getMyOrders)

export default router
