import Config from "@/config";
import { User } from "@/models";
import { RequestWithUser } from '@/types';
import { Response } from 'express';

type PaymentRepository = {
    getPayments: (req: RequestWithUser, res: Response) => Promise<void>;
}

const NewPaymentRepository = (app: Config): PaymentRepository => {
    const getPayments = async (req: RequestWithUser, res: Response) => {
        res.setHeader('Content-Type', 'application/json');

        // Get authenthicated user
        const user = await req.user?.() as User;

        // Get payments from database
        const payments = await app.db.getUserPayments(user.id);
        if (!payments) {
            res.status(500).json({ message: "DB error getting payments" });
            return;
        }

        res.status(200).json(payments);
    };

    return {
        getPayments,
    };
};

export { PaymentRepository, NewPaymentRepository };