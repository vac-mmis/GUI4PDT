/**
 * Backend logging management with Winston
 *
 * @module utils.logger
 */
import winston from "winston";

const { combine, timestamp, printf, colorize, uncolorize } = winston.format;

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL ?? "info",
    format: combine(
        colorize({ all: true }),
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss.SSS",
        }),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            level: process.env.LOG_LEVEL ?? "info",
            filename: process.env.LOG_FILENAME ?? "backend.log",
            format: combine(
                uncolorize(),
                timestamp(),
                printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
            ),
        }),
    ],
});
