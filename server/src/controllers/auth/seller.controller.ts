import AsyncCatchError from '../../utils/AsyncCatchError'
import { Request, Response, NextFunction } from 'express'
import Seller from '../../models/seller.model'
import Store from '../../models/store.model'
import Address from '../../models/address.model'
import EmailService from '../../utils/EmailService'
import Auth from './Auth'

export default class SellerController {
	auth: Auth = new Auth('Seller')
	signup = AsyncCatchError(
		async (req: Request, res: Response, next: NextFunction) => {
			const { sellerİnformation, companyİnformation, addressİnformation } =
				req.body

			const seller = await Seller.create(sellerİnformation)

			const address = await Address.create({
				...addressİnformation,
				sellerId: seller._id,
			})

			const store = await Store.create({
				...companyİnformation,
				sellerId: seller._id,
				addressId: address._id,
			})

			await Seller.findByIdAndUpdate(seller._id, {
				storeId: store._id,
				$push: {
					address: address._id,
				},
			})

			const emailService = new EmailService({
				model: seller,
				subject: 'Account Verification | ByteBazaar',
				templateDir: 'emailConfirm',
				url: `${process.env.APP_URL}/verify/confirm-account/${seller.confirmToken}`,
			})
			await emailService.sendAccountConfirmationEmail()

			res.status(201).json({
				status: 'success',
				isSuccess: true,
				message:
					'Your account has been created successfully. Please check your email to confirm your account.',
			})
		}
	)

	signin = (req: Request, res: Response, next: NextFunction) => {
		this.auth.signin(req, res, next)
	}

	confirmAccount = (req: Request, res: Response, next: NextFunction) => {
		this.auth.confirmAccount(req, res, next)
	}

	isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
		this.auth.isLoggedIn(req, res, next)
	}

	getMe = (req: Request, res: Response, next: NextFunction) => {
		this.auth.getMe(req, res, next)
	}

	logout = (req: Request, res: Response, next: NextFunction) => {
		this.auth.logout(req, res, next)
	}

	forgotPassword = (req: Request, res: Response, next: NextFunction) => {
		this.auth.forgotPassword(req, res, next)
	}

	resetPassword = (req: Request, res: Response, next: NextFunction) => {
		this.auth.resetPassword(req, res, next)
	}

	updatePassword = (req: Request, res: Response, next: NextFunction) => {
		this.auth.updatePassword(req, res, next)
	}
}
