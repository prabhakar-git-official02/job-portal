import express from 'express'
import {setRegister,Login,googleAuthLogin,Me,Logout,EmailExist, Login_Activty_Get} from '../controllers/authController.js'
import { authmiddleware } from '../middleware/auth.js'
import {adminMiddleware } from '../middleware/adminMiddleware.js'
import { privateMsg } from '../controllers/authController.js'
import { ForgetPassword , ResetPassword } from '../controllers/authController.js'
import { RefreshToken } from '../controllers/authController.js'
import { Login_Activity } from '../controllers/authController.js'

const route = express.Router()

route.post('/register',setRegister) 

// route.post('/googleAuthRegister',googleAuthRegister)

route.post('/login',Login)

route.post('/googleAuthLogin',googleAuthLogin)

route.post('/refresh',RefreshToken)

route.post('/forgetPassword',ForgetPassword)

route.post('/reset-password/:token',ResetPassword)

route.post('/private',authmiddleware,adminMiddleware,privateMsg)

route.get('/me',authmiddleware,Me)

route.delete('/logout',authmiddleware,Logout)

route.post('/existEmail',EmailExist)

route.post('/loginActivity',authmiddleware,Login_Activity)

route.get('/loginActivity/Get',authmiddleware,Login_Activty_Get)

export default route