import { User, Payment } from "@/models";
import { Request } from "express";

interface RequestWithUser extends Request {
    user?: () => Promise<User | null>;
}

// add more fields to Payment
type PaymentWithDetails = Payment & {
    start_date: Date;
    end_date: Date;
    car_id: string;
};

export { RequestWithUser, PaymentWithDetails };