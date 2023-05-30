import { Router } from 'express'
import Auth from '../controllers/auth/Auth'
import ProductController from '../controllers/product/product.controller'

const router: Router = Router()
const auth: Auth = new Auth('')
const productController: ProductController = new ProductController()

router.post(
	'/create',
	auth.isLoggedIn,
	auth.restrictTo,
	productController.createProduct
)

router.get('/all', productController.getAllProducts)
router.get('/get-one/:slug', productController.getProduct)

router.delete(
	'/delete/:slug',
	auth.isLoggedIn,
	auth.restrictTo,
	productController.deleteProduct
)

router.patch(
	'/update/:slug',
	auth.isLoggedIn,
	auth.restrictTo,
	productController.updateProduct
)

export default router
