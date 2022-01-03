"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll();
    console.log('getUsers called');
    res.json({
        msg: 'getUsers',
        users
    });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (!user) {
        res.status(404).json({
            msg: `No existe usuario con id ${id}`
        });
    }
    res.json({
        msg: 'getUser',
        user
    });
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        // Verificacion si existe usuario con el email
        const existeEmail = yield user_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            res.status(400).json({
                msg: 'Ya existe un usuario con el email: ' + body.email
            });
            return;
        }
        // Option 1: Build and save
        const user1 = user_1.default.build(body);
        yield user1.save();
        // Option 2: Create
        // const user2 = await User.create(body)
        res.json({ user: user1 });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        // Verificacion si existe usuario con ese id
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({
                msg: 'No existe un usuario con el id' + id
            });
            return;
        }
        yield user.update(body);
        res.json({ user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (!user) {
        res.status(404).json({
            msg: 'No existe un usuario con el id' + id
        });
        return;
    }
    // Borrado fisico
    // await user.destroy();
    // Borrado logico (recomendado)
    yield user.update({ state: 0 });
    res.json({
        msg: 'deleteUsers',
        user,
    });
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map