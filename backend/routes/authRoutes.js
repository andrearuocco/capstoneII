import express from 'express'
import { loginUser, getUserData } from '../controllers/authentication.controller.js'
import authorization from '../middleware/authorization.js'

const authRouter = express.Router()

authRouter.post('/login', loginUser)

authRouter.get('/me', authorization, getUserData)

/* 
// login google
authRouter.get('/login-google', passport.authenticate('google', {
	scope: ['profile', 'email']
}))

authRouter.get('/callback-google', passport.authenticate('google', {
	session: false
}), callbackGoogle) 
*/

export default authRouter