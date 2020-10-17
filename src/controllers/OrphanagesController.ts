import {Request, Response} from 'express';
import{getRepository} from 'typeorm';

import Orphanege from '../models/Orphanege';
import orphanage_view from '../views/orphanage_View';
import * as yup from 'yup';



export default{
    async index( request:Request, response:Response){
        const orphanegesRepository = getRepository(Orphanege);
        const orphaneges = await orphanegesRepository.find({
            relations:['images']
        });

        return response.json(orphanage_view.renderMany(orphaneges));
    },

    async show( request:Request, response:Response){
        const { id } = request.params;
    const orphanegesRepository = getRepository(Orphanege);
    const orphanege = await orphanegesRepository.findOneOrFail(id, {
        relations:['images']
    });
    return response.json(orphanage_view.render(orphanege));
    },


    async create( request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = request.body;
     
        const orphanegesRepository = getRepository(Orphanege);
        
        const requestImages= request.files as Express.Multer.File [];
        const images = requestImages.map(image => {
            return { path: image.filename}
        })
        const data = {
     
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        
           };
           const schema = yup.object({
            name: yup.string().required(),
            latitude: yup.number().required(),
            longitude: yup.number().required(),
            about: yup.string().required().max(300),
            instructions: yup.string().required(),
            opening_hours: yup.string().required(),
            open_on_weekends: yup.boolean().required(),
            images: yup.array(
                yup.object().shape({
                    path:yup.string().required(),
                })
            )

           });
            await schema.validate(data,{
                abortEarly: false,
            })

        const orphanege = orphanegesRepository.create(data)
     
         
        await orphanegesRepository.save(orphanege);
        
         return response.status(201).json(orphanege);


    }
}