import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {
  //http://localhost:3333/answers/1?u=0cae9176-27c1-40e7-8afc-f7566a7c1eec

  /**
   *
   * Route Params => Parametros que compoe a rota
   * routes.get('answers/:value/')
   *
   * Query Params => Busca, paginação
   * vem sempe depois ?
   * chave=valor
   *
   */

  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveyUsersRepository = getCustomRepository(SurveysUsersRepository);
    const surveyUser = await surveyUsersRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppError('Survey User does not exists!');
    }

    surveyUser.value = Number(value);

    await surveyUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export { AnswerController };
