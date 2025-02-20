"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
exports.default = {
    async getData(req, res) {
        try {
            const { parameter, startDate, endDate } = req.query;
            let query = (0, database_1.default)('air_quality_data').select('date_time');
            if (parameter) {
                query = query.select(parameter);
            }
            if (startDate && endDate) {
                query = query.whereBetween('date_time', [startDate, endDate]);
            }
            const data = await query;
            res.json(data);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    async getAvailableParameters(_, res) {
        const parameters = [
            'co', 'nmhc', 'benzene', 'nox', 'no2',
            'sensor1', 'sensor2', 'sensor3', 'sensor4', 'sensor5'
        ];
        res.json(parameters);
    }
};
