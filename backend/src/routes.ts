import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import SafeCityController from './controllers/SafeCityControllers';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/cities', upload.array('images'), SafeCityController.create);
routes.get('/cities', SafeCityController.index);
routes.get('/cities/:id', SafeCityController.show);

export default routes;