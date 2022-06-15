import mongoose from "mongoose";

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost/agenda');
        console.log('>>> Database connected');
    }
    catch {
        console.log('Error');
    }
}

export default connect;