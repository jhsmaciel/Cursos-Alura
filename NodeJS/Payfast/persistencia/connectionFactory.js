var mysql  = require('mysql');

function createDBConnection(){
		return mysql.createConnection({
			host: 'localhost',
			user: 'jhsmaciel',
			password: 'root',
			database: 'payfast'
		});
}

module.exports = function() {
	return createDBConnection;
}
