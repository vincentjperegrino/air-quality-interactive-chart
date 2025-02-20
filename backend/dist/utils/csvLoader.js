"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCSVData = void 0;
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const database_1 = __importDefault(require("../config/database"));
const loadCSVData = async () => {
    const results = [];
    fs_1.default.createReadStream('./AirQualityUCI.csv')
        .pipe((0, csv_parser_1.default)({ separator: ';' })) // Set correct delimiter
        .on('data', (data) => {
        const parseNumber = (value) => {
            return value ? parseFloat(value.replace(',', '.')) || 0 : 0;
        };
        const dateTimeString = `${data['Date']} ${data['Time'].replace('.', ':')}`;
        const parsedDate = new Date(dateTimeString);
        results.push({
            date_time: isNaN(parsedDate.getTime()) ? new Date().toISOString() : parsedDate.toISOString(), // Store in ISO format
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
        const batchSize = 500; // Adjust the batch size based on your database's limit
        const batches = Math.ceil(results.length / batchSize);
        for (let i = 0; i < batches; i++) {
            const batch = results.slice(i * batchSize, (i + 1) * batchSize);
            await database_1.default.batchInsert('air_quality_data', batch);
        }
        console.log('CSV data successfully loaded');
    });
};
exports.loadCSVData = loadCSVData;
