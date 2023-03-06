import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import config from './config';
import { ErrorHandler } from './handlers';
import { authRoutes, chatRoutes, userRoutes } from './routes';

const PORT = config.PORT || 5000;
const app: Application = express();
const apiVersion = config.API_VERSION || 'v1';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.disable('x-powered-by');

//routes
app.use(`/api/${apiVersion}/auth`, authRoutes);
app.use(`/api/${apiVersion}/users`, userRoutes);
app.use(`/api/${apiVersion}/chats`, chatRoutes);

//error handler
app.use(ErrorHandler.error);

const server = app.listen(PORT, () => console.log(`server running on PORT:: 🚀💥>>> ${PORT}`));
export const httpServer = server;
