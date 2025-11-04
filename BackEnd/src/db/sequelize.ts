import { Sequelize } from "sequelize-typescript";
import config from 'config'
import DevelopmentTeam from "../models/DevelopmentTeam";
import Meeting from "../models/Meeting";

const sequelize = new Sequelize({
    ...config.get('db'),
    dialect: 'mysql',
    models: [DevelopmentTeam, Meeting],
    logging: console.log
})

export default sequelize