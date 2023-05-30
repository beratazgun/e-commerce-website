import { Router } from 'express'
import SellerController from '../controllers/auth/seller.controller'

const router: Router = Router()
const sellerController: SellerController = new SellerController()

router.post('/signup', sellerController.signup)
router.post('/signin', sellerController.signin)
router.post('/verify/confirm-account/:token', sellerController.confirmAccount)

// this will send forgot password email
router.post('/forgot-password', sellerController.forgotPassword)
// this will reset password
router.patch('/reset-password/:token', sellerController.resetPassword)

router.get('/account/me', sellerController.isLoggedIn, sellerController.getMe)
router.post('/logout', sellerController.isLoggedIn, sellerController.logout)
router.post(
	'/update-password',
	sellerController.isLoggedIn,
	sellerController.updatePassword
)

export default router
