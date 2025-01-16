import express, {Request, Response, NextFunction} from 'express';
import { AppDataSource } from './data-source';
const morgan = require('morgan');
import routes from './routes';

AppDataSource.initialize().then(() => {
	const app = express()

	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header(
			'Access-Control-Allow-Header',
			'Origin, X-Requested-With, Content-Type, Accept, Authorization'
		);
	
		if (req.method === 'OPTIONS') {
			res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
			res.setHeader("Content-Type", "application/json");
			return res.status(200).send({});
		}
		next();
	});

	app.use(express.json());
	app.use(morgan('dev'));
	app.use(routes);
	
	app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
		return res.json({ message: "OPS! Não foi possivel processar sua requisicao"})
	})

	app.use((req: Request, res: Response, next: NextFunction) => {
		const error = new Error('Rota não encontrada.');
		next(error);
	});
	
	app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
		return res.status(500).send({mensagem: error.message});
	});
	return app.listen(process.env.PORT)
});