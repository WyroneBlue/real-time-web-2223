import mongoose from 'mongoose';

const user = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.MONGO_CLUSTER;
const key = process.env.MONGO_KEY;

const connectionString = `mongodb+srv://${user}:${password}@${cluster}.${key}.mongodb.net/?retryWrites=true&w=majority`;
export const connectDB = async () => {
    try {
        mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(`Could not make db connection: ${err}`);
        throw err;
    }
};