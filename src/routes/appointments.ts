import { Router, Request, Response } from "express";

const router = Router();

import User from '../models/User';
import Appointment from '../models/Appointment';

router.route('/create')
    .get((req: Request, res: Response) => {
        res.render('appointments/create');
    })
    .post(async (req: Request, res: Response) => {
        //check if appointment already existing in time-span
        Appointment.find({ $and: [ { startDate: { $lte: req.body.endDate } }, { endDate: { $gte: req.body.startDate } } ] }).
            then(async function (result) {
                if (result && result.length) {
                    //appointment already existing
                    res.sendStatus(400);
                } else {
                    //create new appointment
                    const { userId, startDate, endDate } = req.body;
                    const newAppointment = new Appointment({ startDate, endDate });
                    await newAppointment.save();

                    const user = await User.findById({ _id: req.body.userId })
                    user.appointments.push(newAppointment);
                    await user.save();

                    res.sendStatus(201);
                }
            });
    });

router.route('/list')
    .get(async (req: Request, res: Response) => {
        const appointments = await Appointment.find().lean();

        res.render('appointments/list', { appointments });
    });

export default router;