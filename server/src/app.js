import bodyParser from 'body-parser';
import express from 'express'
import helmet from 'helmet';
import cors from 'cors'
import router from './routes';

const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());


router(app)
export default app;