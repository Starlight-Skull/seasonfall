;(function () {
    'use strict';

    const mysql = require('mysql2/promise');

    const config = {
        host: 'mysql',
        user: 'root',
        password: 'Azerty123',
        database: 'Seasonfall'
    };

    async function getDatabaseConnection() {
        return mysql.createConnection(config);
    }

    module.exports.getDatabaseConnection = getDatabaseConnection;
})();