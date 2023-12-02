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

type GetCarsFilter = {
    make?: string;
    model?: string;
    color?: string;
    year?: number;
    location?: number;
    start_date?: Date;
    end_date?: Date;
}

export { RequestWithUser, PaymentWithDetails, GetCarsFilter };