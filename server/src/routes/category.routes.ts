import { Router } from 'express'
import Auth from '../controllers/auth/Auth'
import CategoryController from '../controllers/category.controller'

const router: Router = Router()
const auth: Auth = new Auth('')
const categoryController: CategoryController = new CategoryController()

router.post('/create', auth.restrictTo, categoryController.createCategory)
router.get('/all', categoryController.getAllCategories)
router.delete('/delete/:categorySlug', categoryController.deleteCategory)

export default router
