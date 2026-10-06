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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const crypto_1 = require("crypto");
const User_1 = __importDefault(require("./User"));
const hashPassword = (password) => {
    const salt = (0, crypto_1.randomBytes)(16).toString('hex');
    return `${salt}:${(0, crypto_1.scryptSync)(password, salt, 64).toString('hex')}`;
};
// create
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!password) {
            return res.status(400).json({ message: 'password is required' });
        }
        const newUser = new User_1.default({ name, email, password: hashPassword(password) });
        yield newUser.save();
        const _a = newUser.toObject(), { password: _omit } = _a, safe = __rest(_a, ["password"]);
        return res.status(201).json(safe);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating user', error });
    }
});
exports.createUser = createUser;
// get all
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error retrieving users', error });
    }
});
exports.getUsers = getUsers;
// get by id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error retrieving user', error });
    }
});
exports.getUserById = getUserById;
// update
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateData = Object.assign({}, req.body);
        if (updateData.password) {
            updateData.password = hashPassword(updateData.password);
        }
        const updatedUser = yield User_1.default.findByIdAndUpdate(req.params.id, updateData, {
            new: true, // return the updated document
            runValidators: true, // check against schema
        });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating user', error });
    }
});
exports.updateUser = updateUser;
// delete
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting user', error });
    }
});
exports.deleteUser = deleteUser;
