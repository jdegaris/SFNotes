import mongoose from 'mongoose'
const connection = {}

async function connectDb() {
    // if (connection.isConnected) {
    //     // Use existing database connection
    //     console.log('Using existing connection');
    //     return;
    // }
    // // Use new database connection
    // const db = await mongoose.connect(process.env.MONGO_URI, {
    //     useCreateIndex: true,
    //     useFindAndModify: false,
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // })
    // console.log("DB Connected");
    // connection.isConnected = db.connections[0].readyState

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('DB Connected');
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

export default connectDb