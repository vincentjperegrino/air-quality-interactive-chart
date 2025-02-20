import { Request, Response } from 'express';
import db from '../config/database';

interface QueryParams {
  parameter?: string;
  startDate?: string;
  endDate?: string;
}

export default {
  async getData(req: Request, res: Response) {
    try {
      const { parameter, startDate, endDate } = req.query as QueryParams;
      
      let query = db('air_quality_data').select('date_time');
      if (parameter) {
        query = query.select(parameter);
      }

      if (startDate && endDate) {
        query = query.whereBetween('date_time', [startDate, endDate]);
      }

      const data = await query;
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getAvailableParameters(_: Request, res: Response) {
    const parameters = [
      'co', 'nmhc', 'benzene', 'nox', 'no2', 
      'sensor1', 'sensor2', 'sensor3', 'sensor4', 'sensor5'
    ];
    res.json(parameters);
  }
};