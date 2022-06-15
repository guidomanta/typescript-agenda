import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    appointments: [{
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
    }]
},
    { timestamps: true });

export default model('User', UserSchema);