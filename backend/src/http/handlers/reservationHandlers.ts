import Config from '@/config';
import { User } from '@/models';
import { RequestWithUser } from '@/types';
import { Request, Response } from 'express';

interface ReservationRepository {
    reserve: (req: RequestWithUser, res: Response) => Promise<void>;
    deleteReservation: (req: Request, res: Response) => Promise<void>;
    getUserReservations: (req: RequestWithUser, res: Response) => Promise<void>;
    getCarReservations: (req: RequestWithUser, res: Response) => Promise<void>;
}

const NewReservationRepository = (app: Config): ReservationRepository => {
    interface PostReservationRequestBody {
        car_id?: string;
        start_date?: Date;
        end_date?: Date;
    }

    // POST to /reservations
    const reserve = async (req: RequestWithUser, res: Response) => {
        res.setHeader('Content-Type', 'application/json');

        // Get data from request body
        const body = req.body as PostReservationRequestBody;

        // Validate data
        if (!body.car_id) {
            res.status(400).json({ message: "Missing car id" });
            return;
        }

        if (!body.start_date) {
            res.status(400).json({ message: "Missing reservation start date" });
            return;
        }

        if (!body.end_date) {
            res.status(400).json({ message: "Missing reservation end date" });
            return;
        }

        // Get authenthicated user
        const user = await req.user?.() as User;

        const car = await app.db.getCarByID(body.car_id);
        if (!car) {
            res.status(500).json({ message: "DB error getting car" });
            return;
        }

        // Create reservation and add to the database
        const reservation = await app.db.createReservation(
            {
                user_id: user.id,
                car_id: body.car_id,
                start_date: new Date(body.start_date),
                end_date: new Date(body.end_date)
            }
        );
        if (!reservation) {
            res.status(500).json({ message: "DB error creating reservation" });
            return;
        }

        const days = 1 + Math.ceil((reservation.end_date.getTime() - reservation.start_date.getTime()) / (1000 * 60 * 60 * 24));
        const amount = days * car.price;

        // Create payment and add to the database
        await app.db.createPayment(
            {
                reservation_id: reservation.id as number,
                amount: amount,
                due_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                status: "unpaid"
            }
        );

        res.status(201).json(reservation);
    };

    // POST to /reservations/{id}
    const deleteReservation = async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');

        const id = +req.params.id;

        const reservation = await app.db.deleteReservation(id);

        res.status(201).json(reservation);
    };

    // GET to /users/reservations
    const getUserReservations = async (req: RequestWithUser, res: Response) => {
        res.setHeader('Content-Type', 'application/json');

        // Get authenticated user
        const user = await req.user?.() as User;

        const reservations = await app.db.getUserReservations(user.id);

        res.status(200).json(reservations);
    };

    // GET to /cars/{id}/reservations
    const getCarReservations = async (req: RequestWithUser, res: Response) => {
        res.setHeader('Content-Type', 'application/json');

        const id = req.params.id;

        const reservations = await app.db.getCarReservations(id);

        const resBody = reservations.map((reservation) => {
            return {
                startDate: reservation.start_date,
                endDate: reservation.end_date
            };
        });

        res.status(200).json(resBody);
    };

    return {
        reserve,
        deleteReservation,
        getUserReservations,
        getCarReservations,
    };
};

export { ReservationRepository, NewReservationRepository };