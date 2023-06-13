const mongoose = require("mongoose");
mongoURI = "mongodb://localhost:27017/invoice";
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
    }
}

module.exports = connectToMongo;