import { Schema, model } from "mongoose";

const AppointmentSchema = new Schema({
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{timestamps: true});

export default model('Appointment', AppointmentSchema);