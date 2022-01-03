import { Router } from "express";
import {
    getUser,
    deleteUser,
    getUsers,
    postUser,
    putUser
} from '../controllers/user.controller';

const router = Router();

router.get('/',       getUsers );
router.get('/:id',    getUser );
router.post('/',      postUser );
router.put('/:id',    putUser );
router.delete('/:id', deleteUser );

export default router;