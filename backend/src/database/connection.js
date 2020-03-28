const knex = require('knex');
const confg = require('../../knexfile');
const config = process.env.NODE_ENV === 'test' ? confg.test : confg.development
const connection = knex(config);

module.exports = connection;