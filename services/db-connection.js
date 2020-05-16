module.exports = DbConnection;
var mysql = require('mysql');
var pool = null;

function DbConnection($config, $event, $logger) {
    this.connect = function(config) {
        config.connectionLimit = 200;
        pool = mysql.createPool(config);
    };

    this.query = async function (queryString) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function(err, connection) {
                connection.query(queryString,
                    function (error, results, fields) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    }
                );
            });
        });
    };
}