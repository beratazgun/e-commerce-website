import { Router } from 'express'
import AddressController from '../controllers/address.controller'
import Auth from '../controllers/auth/Auth'

const router: Router = Router()
const addressController: AddressController = new AddressController()
const auth = new Auth('')

router.post('/create', auth.isLoggedIn, addressController.createAddress)

router.delete('/delete', auth.isLoggedIn, addressController.deleteAddress)

router.patch('/update', auth.isLoggedIn, addressController.updateAddress)
router.get('/get-all-address', auth.isLoggedIn, addressController.getAllAddress)
router.get('/get-address', auth.isLoggedIn, addressController.getAddressById)

export default router
