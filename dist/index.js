"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const morgan = require('morgan');
const routes_1 = __importDefault(require("./routes"));
data_source_1.AppDataSource.initialize().then(() => {
    const app = (0, express_1.default)();
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            res.setHeader("Content-Type", "application/json");
            return res.status(200).send({});
        }
        next();
    });
    app.use(express_1.default.json());
    app.use(morgan('dev'));
    app.use(routes_1.default);
    app.use((error, req, res, next) => {
        return res.json({ message: "OPS! Não foi possivel processar sua requisicao" });
    });
    app.use((req, res, next) => {
        const error = new Error('Rota não encontrada.');
        next(error);
    });
    app.use((error, req, res, next) => {
        return res.status(500).send({ mensagem: error.message });
    });
    return app.listen(process.env.PORT, () => {
        console.log(`API RUNNING PORT: ${process.env.PORT}`);
    });
});
