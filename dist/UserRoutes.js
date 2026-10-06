"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("./UserController");
const router = express_1.default.Router();
router.post('/users', UserController_1.createUser);
router.get('/users', UserController_1.getUsers);
router.get('/users/:id', UserController_1.getUserById);
router.put('/users/:id', UserController_1.updateUser);
router.delete('/users/:id', UserController_1.deleteUser);
exports.default = router;
