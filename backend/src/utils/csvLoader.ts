import csv from 'csv-parser';
import fs from 'fs';
import db from '../config/database';
import moment from 'moment';

export const loadCSVData = async () => {
  const results: any[] = [];

  fs.createReadStream('./AirQualityUCI.csv')
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => {
      const parseNumber = (value: string) => {
        return value ? parseFloat(value.replace(',', '.')) || 0 : 0;
      };

      const fixedTime = data.Time.replace(/\./g, ':');
      const dateTimeString = `${data.Date} ${fixedTime}`;
      const parsedDate = moment(dateTimeString, 'DD/MM/YYYY HH:mm:ss', true);

      // Skip invalid dates
      if (!parsedDate.isValid()) {
        console.error('Skipping invalid date:', dateTimeString);
        return;
      }

      results.push({
        date_time: parsedDate.toISOString(),
        co: parseNumber(data['CO(GT)']),
        nmhc: parseNumber(data['NMHC(GT)']),
        benzene: parseNumber(data['C6H6(GT)']),
        nox: parseNumber(data['NOx(GT)']),
        no2: parseNumber(data['NO2(GT)']),
        sensor1: parseNumber(data['PT08.S1(CO)']),
        sensor2: parseNumber(data['PT08.S2(NMHC)']),
        sensor3: parseNumber(data['PT08.S3(NOx)']),
        sensor4: parseNumber(data['PT08.S4(NO2)']),
        sensor5: parseNumber(data['PT08.S5(O3)']),
      });
    })
    .on('end', async () => {
      const batchSize = 500;
      const batches = Math.ceil(results.length / batchSize);

      for (let i = 0; i < batches; i++) {
        const batch = results.slice(i * batchSize, (i + 1) * batchSize);
        await db.batchInsert('air_quality_data', batch);
      }

      console.log('CSV data successfully loaded');
    });
};