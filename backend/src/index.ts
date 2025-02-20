import express from 'express';
import cors from 'cors';
import db from './config/database';
import { loadCSVData } from './utils/csvLoader';
import dataRoutes from './routes/data';

const app = express();
const PORT = 5000;

app.use(cors());
app.use('/api/data', dataRoutes);

const initializeApp = async () => {
  try {
    await db.raw('SELECT 1');
    console.log('Database connected');
    
    const exists = await db.schema.hasTable('air_quality_data');
    if (!exists) {
      await db.migrate.latest();
      await loadCSVData();
    }
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize app:', error);
    process.exit(1);
  }
};

initializeApp();