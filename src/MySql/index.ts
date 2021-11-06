import mysql, { Connection } from 'mysql2'
import configData from './config'

class Mysql {
	connection: Connection
	constructor() {
		this.connection = mysql.createConnection(configData)
	}

	init() {
		this.connection.connect()
		// this.connection.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
		//     if (error) {
		//         console.log(error)
		//         return
		//     }
		// })
		// this.connection.query('SELECT * FROM websites', function(error, results, fields) {
		//     if (error) {
		//         console.log(error)
		//         return
		//     }
		//     console.log('SELECT ', results)
		// })
		this.connection.end()
	}
}

const mySqlInit = function () {
	const mysqlData = new Mysql()
	mysqlData.init()
	return mysqlData
}

export { mySqlInit }
