import express from 'express';
import { createUser, getUsers, updateUser, deleteUser, searchUsers } from '../controllers/user.controller.js';

const userRouter = express.Router()

userRouter.post('/', createUser)
userRouter.get('/', getUsers)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)
userRouter.get('/', searchUsers)

export default userRouter