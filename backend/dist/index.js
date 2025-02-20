"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const csvLoader_1 = require("./utils/csvLoader");
const data_1 = __importDefault(require("./routes/data"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)());
app.use('/api/data', data_1.default);
const initializeApp = async () => {
    try {
        await database_1.default.raw('SELECT 1');
        console.log('Database connected');
        const exists = await database_1.default.schema.hasTable('air_quality_data');
        if (!exists) {
            await database_1.default.migrate.latest();
            await (0, csvLoader_1.loadCSVData)();
        }
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to initialize app:', error);
        process.exit(1);
    }
};
initializeApp();
