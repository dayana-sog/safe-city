import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import SafeCity from '../models/SafeCity';
import * as Yup from 'yup';

import SafeCityView from '../view/save_city_view';

export default {
  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      when_hours,
      phone, 
      reported_crime,
    } = req.body;
  
    const citiesRepository = getRepository(SafeCity);

    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      when_hours,
      phone, 
      reported_crime: reported_crime === 'true',
      images,
    };

    const phoneRegex = (/(\(?\d{3}\)?\s)?(\d{3,5}\-\d{3,5}\-\d{3,5})/g);

    const schema = Yup.object().shape({
      name: Yup.string().required('Informe seu nome'),
      latitude: Yup.number().required('Informe sua localização'),
      longitude: Yup.number().required('Informe sua localização'),
      about: Yup.string().required().max(300),
      when_hours: Yup.string().required('Informe o horário que ocorreu'),
      reported_crime: Yup.boolean().required('Informe se prestou queixa'),
      phone: Yup.string().matches(phoneRegex).required('Número informado não existe'),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required(),
      }))
    });

    await schema.validate(data, {
      abortEarly: false
    });

    const safecity = citiesRepository.create(data);
  
    await citiesRepository.save(safecity);
  
    return res.status(201).json(safecity);
  },

  async index(req: Request, res: Response) {
    const citiesRepository = getRepository(SafeCity);
  
    const safecity = await citiesRepository.find({
      relations: [ 'images' ]
    });
  
    return res.json(SafeCityView.renderMany(safecity));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const citiesRepository = getRepository(SafeCity);
  
    const safecity = await citiesRepository.findOneOrFail(id, {relations: [ 'images' ]});
  
    return res.json(SafeCityView.render(safecity));
  }
};