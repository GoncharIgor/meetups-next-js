//TODO to run mongoDb connection code on server, not on client
import {MongoClient} from 'mongodb';

class DbConnection {
    static dbInstance = null;

    constructor() {
        DbConnection.dbInstance = this;
    }

    async connect() {
        try {
            const dbConnectionUrl = 'mongodb+srv://igorgo:testpass@cluster0.80g4m.mongodb.net/meetups?retryWrites=true&w=majority';
            const client = await MongoClient.connect(dbConnectionUrl);

            return client.db();
        } catch (e) {
            console.log('Error trying to open DB connection');
            return e;
        }
    }

    async disconnect(connection) {
        try {
            connection.close();
        } catch (e) {
            console.log('Error trying to close DB connection');
            console.log(e);
        }
    }

    static getInstance() {
        if (DbConnection.dbInstance) {
            return DbConnection.dbInstance;
        }
        this.instance = new DbConnection();
        return this.instance;
    }
}

const dbConnection = DbConnection.getInstance();
Object.freeze(dbConnection);

export default dbConnection;

