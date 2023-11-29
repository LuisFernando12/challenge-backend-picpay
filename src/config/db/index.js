import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

mongoose.connect(`mongodb://admin:change_me@localhost:27017`,{
    dbName:process.env.MONGODB_COLLECTION
});

const connection = mongoose.connection;

export default connection;
