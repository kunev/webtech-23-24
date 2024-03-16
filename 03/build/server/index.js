"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.get('/', (_req, res) => {
    res.send('hi!');
});
app.get('/public/:filename', (req, res) => {
    res.sendFile(req.params.filename, { root: path_1.default.join(__dirname, 'public') });
});
app.listen(3000, () => console.log('Server is listening'));
