import mysql from "mysql2/promise";

interface DB {
    MySQL: mysql.Connection;
}

const connectMySQL = async (options: mysql.ConnectionOptions) => {
    const conn = await mysql.createConnection(options);

    // check if the connection has an error
    conn.on("error", (err) => {
        console.error(err);
        throw new Error("Error: MySQL connection failed.");
    });

    // ping db and check if there is an error
    await conn.ping().catch((err) => {
        console.error(err);
        throw new Error("Error: MySQL connection failed.");
    });

    const db: DB = {
        MySQL: conn,
    };

    return db;
};

export { DB, connectMySQL };
