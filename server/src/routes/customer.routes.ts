import { Router } from 'express'
import CustomerController from '../controllers/auth/customer.contoller'

const router: Router = Router()
const customerController: CustomerController = new CustomerController()

router.post('/checkData/:fieldName', customerController.checkData)

router.post('/signup', customerController.signup)
router.post('/signin', customerController.signin)
router.post('/verify/confirm-account/:token', customerController.confirmAccount)

router.post(
	'/resend-verification-email',
	customerController.resendVerificationEmail
)

// this will send forgot password email
router.post('/forgot-password', customerController.forgotPassword)
// this will reset password
router.patch('/reset-password/:token', customerController.resetPassword)

router.get(
	'/account/me',
	customerController.isLoggedIn,
	customerController.getMe
)
router.post('/logout', customerController.isLoggedIn, customerController.logout)
router.post(
	'/update-password',
	customerController.isLoggedIn,
	customerController.updatePassword
)

export default router
