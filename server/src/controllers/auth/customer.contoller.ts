import { Request, Response, NextFunction } from 'express'

import Customer from '../../models/customer.model'
import AsyncCatchError from '../../utils/AsyncCatchError'
import EmailService from '../../utils/EmailService'

import { capitalize } from 'lodash'
import Auth from './Auth'

export default class CustomerController {
	auth: Auth = new Auth('Customer')
	signup = AsyncCatchError(
		async (req: Request, res: Response, next: NextFunction) => {
			const customer = await Customer.create(req.body)

			const emailService = new EmailService({
				model: customer,
				subject: 'Account Verification | ByteBazaar',
				templateDir: 'emailConfirm',
				url: `${process.env.APP_URL}/verify/confirm-account/${customer.confirmToken}`,
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

	resendVerificationEmail = (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		this.auth.resendVerificationEmail(req, res, next)
	}

	checkData = AsyncCatchError(
		async (req: Request, res: Response, next: NextFunction) => {
			const { fieldName } = req.params

			const customer = await Customer.findOne({
				[fieldName]: req.body[fieldName],
			})

			if (customer) {
				res.status(200).json({
					message: `${capitalize(fieldName)} already exists.`,
					isExist: true,
				})
			} else {
				res.status(200).json({
					isExist: false,
				})
			}
		}
	)
}
