"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = tslib_1.__importDefault(require("config"));
const DevelopmentTeam_1 = tslib_1.__importDefault(require("../models/DevelopmentTeam"));
const Meeting_1 = tslib_1.__importDefault(require("../models/Meeting"));
const sequelize = new sequelize_typescript_1.Sequelize({
    ...config_1.default.get('db'),
    dialect: 'mysql',
    models: [DevelopmentTeam_1.default, Meeting_1.default],
    logging: console.log
});
exports.default = sequelize;
