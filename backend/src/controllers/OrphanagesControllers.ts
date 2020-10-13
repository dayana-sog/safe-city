import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanages';

export default {
  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = req.body;
  
    const orphanagesRepository = getRepository(Orphanage);

    const reqImages = req.files as Express.Multer.File[];
    const images = reqImages.map(image => {
      return { path: image.filename }
    });
  
    const orphanage = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images, 
    });
  
    await orphanagesRepository.save(orphanage);
  
    return res.status(201).json(orphanage);
  },

  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);
  
    const orphanage = await orphanagesRepository.find();
  
    return res.json(orphanage);
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanage);
  
    const orphanage = await orphanagesRepository.findOneOrFail(id);
  
    return res.json(orphanage);
  }
};