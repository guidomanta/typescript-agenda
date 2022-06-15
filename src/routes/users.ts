import { Router, Request, Response } from "express";
import Appointment from "../models/Appointment";

const router = Router();

import User from '../models/User';

router.route('/create')
    .get((req: Request, res: Response) => {
        res.render('users/create');
    })
    .post(async (req: Request, res: Response) => {
        const { firstName, lastName, phone, email } = req.body;
        if (firstName && lastName && phone && email) {
            const newUser = new User({ firstName, lastName, phone, email });
            await newUser.save();
            return res.sendStatus(201);
        }
        return res.sendStatus(400);
    });

router.route('/list')
    .get(async (req: Request, res: Response) => {
        const users = await User.find().lean().populate('appointments');
        res.status(200).render('users/list', { users });
    });

router.route('/user')
    .get(async (req: Request, res: Response) => {
        const user = await User.findOne().exec();
        res.json(user);
    });

export default router;