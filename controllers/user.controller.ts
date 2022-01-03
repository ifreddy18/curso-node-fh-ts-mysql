import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async(req: Request, res: Response): Promise<void> => {

    const users = await User.findAll();


    console.log('getUsers called');
    res.json({
        msg: 'getUsers',
        users
    });

}

export const getUser = async(req: Request, res: Response): Promise<void> => {

    const { id } = req.params;

    const user = await User.findByPk( id );

    if ( !user ) {
        res.status(404).json({
            msg: `No existe usuario con id ${ id }`
        });
    }

    res.json({
        msg: 'getUser',
        user
    });

}

export const postUser = async(req: Request, res: Response): Promise<void> => {

    const { body } = req;

    try {

        // Verificacion si existe usuario con el email
        const existeEmail = await User.findOne({
            where: {
                email: body.email
            }
        });

        if ( existeEmail ) {
            res.status(400).json({
                msg: 'Ya existe un usuario con el email: ' + body.email
            });
            return;
        }

        // Option 1: Build and save
        const user1 = User.build(body);
        await user1.save();

        // Option 2: Create
        // const user2 = await User.create(body)


        res.json({ user: user1 });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }

}

export const putUser = async(req: Request, res: Response): Promise<void> => {

    const { id } = req.params;
    const { body } = req;

    try {

        // Verificacion si existe usuario con ese id
        const user = await User.findByPk( id );

        if ( !user ) {
            res.status(404).json({
                msg: 'No existe un usuario con el id' + id
            });
            return;
        }

        await user.update( body );

        res.json({ user });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }

}

export const deleteUser = async(req: Request, res: Response): Promise<void> => {

    const { id } = req.params;

    const user = await User.findByPk( id );
    if ( !user ) {
        res.status(404).json({
            msg: 'No existe un usuario con el id' + id
        });
        return;
    }

    // Borrado fisico
    // await user.destroy();

    // Borrado logico (recomendado)
    await user.update({ state: 0 });

    res.json({
        msg: 'deleteUsers',
        user,
    });

}
