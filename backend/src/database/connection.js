const knex = require('knex');
const confg = require('../../knexfile');

const connection = knex(confg.development);

module.exports = connection;