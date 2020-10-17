import{Router} from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanegesController from './controllers/OrphanagesController';


const routes = Router();

const upload = multer(uploadConfig);


routes.get('/orphaneges', OrphanegesController.index);
routes.get('/orphaneges/:id', OrphanegesController.show);
routes.post('/orphaneges', upload.array('images'),OrphanegesController.create);
 

 export default routes;