import { Router } from 'express'
import Auth from '../controllers/auth/Auth'
import ReviewController from '../controllers/review.controller'

const router: Router = Router()
const reviewController: ReviewController = new ReviewController()
const auth: Auth = new Auth('')

router.post(
	'/create/:productSlug',
	auth.isLoggedIn,
	reviewController.createReview
)

router.delete(
	'/delete-review/:id',
	auth.isLoggedIn,
	reviewController.deleteReview
)

router.patch(
	'/update-review/:id',
	auth.isLoggedIn,
	reviewController.updateReview
)

router.get('/get-reviews/:productSlug', reviewController.getReviews)

export default router
