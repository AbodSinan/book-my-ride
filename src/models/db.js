import Sequelize from 'sequelize';

import * as settings from '../settings';

export const Conn = new Sequelize(settings.connectionString);

export default Conn;
