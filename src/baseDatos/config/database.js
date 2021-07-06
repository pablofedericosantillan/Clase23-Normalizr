const mysql = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'basedatos'
    },
    pool: { min: 0, max: 7 }
}

const sqlite3 = {
    client: 'sqlite3',
    connection: {
        filename: __dirname + '/../db/mydb.sqlite'
    },
    useNullAsDefault: true
}

module.exports = mysql;

