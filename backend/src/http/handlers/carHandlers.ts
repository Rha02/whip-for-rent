import Config from '@/config';
import { Request, Response } from 'express';

interface CarRepository {
    getCars: (req: Request, res: Response) => Promise<void>;
    getCar: (req: Request, res: Response) => Promise<void>;
    postCar: (req: Request, res: Response) => Promise<void>;
    updateCar: (req: Request, res: Response) => Promise<void>;
    deleteCar: (req: Request, res: Response) => Promise<void>;
}

const NewCarRepository = (app: Config): CarRepository => {
    // GET to /cars
    const getCars = async (req: Request, res: Response) => {
        // TODO: Get a list of cars from the db
        const cars = await app.db.getCars();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars);
    };

    // GET to /cars/{id}
    const getCar = async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');

        // Get the car id from the request
        const id = req.params.id;

        // TODO: Get a car by id from the db
        const car = await app.db.getCarByID(id);
        if (!car) {
            res.status(404).json({ message: `Car with id ${id} not found` });
            return;
        }

        res.status(200).json(car);
    };
    
    interface PostCarRequestBody {
        id?: string;
        make?: string;
        model?: string;
        year?: number;
        color?: string;
        price?: number;
    }

    // POST to /cars
    const postCar = async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        // TODO: Add middleware to check if the user has access rights to post a car

        const body = req.body as PostCarRequestBody;

        // TODO: Add validation to check if car data is valid
        if (!body.id) {
            res.status(400).json({ message: 'Missing car license plate' });
            return;
        }

        if (!body.make) {
            res.status(400).json({ message: 'Missing car make' });
            return;
        }

        if (!body.model) {
            res.status(400).json({ message: 'Missing car model' });
            return;
        }

        if (!body.year || isNaN(body.year)) {
            res.status(400).json({ message: 'Invalid car year' });
            return;
        }

        if (!body.color) {
            res.status(400).json({ message: 'Missing car color' });
            return;
        }

        if (!body.price || isNaN(body.price) || body.price < 0) {
            res.status(400).json({ message: 'Invalid car price' });
            return;
        }

        const car = await app.db.createCar({
            id: body.id,
            make: body.make,
            model: body.model,
            year: body.year,
            color: body.color,
            price: body.price,
            image_url: '',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json(car);
    };

    // PUT to /cars/{id}
    const updateCar = async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        // TODO: Add middleware to check if the user has access rights to update a car

        const id = req.params.id;

        // Get car with id from DB
        let car = await app.db.getCarByID(id);
        if (!car) {
            res.status(404).json({ message: `Car with id ${id} not found` });
            return;
        }

        const body = req.body as PostCarRequestBody;

        // TODO: add validation to check if car data is valid
        if (body.price && (isNaN(body.price) || body.price < 0)) {
            res.status(400).json({ message: 'Invalid car price' });
            return;
        }

        if (body.year && isNaN(body.year)) {
            res.status(400).json({ message: 'Invalid car year' });
            return;
        }

        // Update car in the db
        car = await app.db.updateCar({
            id: id,
            make: body.make || car.make,
            model: body.model || car.model,
            year: body.year || car.year,
            color: body.color || car.color,
            price: body.price || car.price,
            image_url: car.image_url
        });

        res.status(201).json(car);
    };

    // DELETE to /cars/{id}
    const deleteCar = async (req: Request, res: Response) => {
        // TODO: Add middleware to check if the user has access rights to update a car

        res.setHeader('Content-Type', 'application/json');

        const id = req.params.id;

        // Delete car from the db
        await app.db.deleteCar(id.toString());

        res.status(201).json({
            message: `Car with id ${id} was deleted`
        });
    };

    return {
        getCars,
        getCar,
        postCar,
        updateCar,
        deleteCar
    };
};

export { CarRepository, NewCarRepository };
