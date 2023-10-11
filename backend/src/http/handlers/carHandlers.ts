import { Car } from '@/models';
import DatabaseRepository from '@dbrepo/repository';
import { Request, Response } from 'express';

interface CarRepository {
    db: DatabaseRepository;
    getCars: (req: Request, res: Response) => Promise<void>;
    getCar: (req: Request, res: Response) => Promise<void>;
    postCar: (req: Request, res: Response) => Promise<void>;
    updateCar: (req: Request, res: Response) => Promise<void>;
    deleteCar: (req: Request, res: Response) => Promise<void>;
}

const NewCarRepository = (db: DatabaseRepository): CarRepository => {
    // GET to /cars
    const getCars = async (req: Request, res: Response) => {
        // TODO: Get a list of cars from the db
        const cars = await db.getCars();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars);
    };

    // GET to /cars/{id}
    const getCar = async (req: Request, res: Response) => {
        // Get the car id from the request
        const id = req.params.id;

        // TODO: Get a car by id from the db
        const car = await db.getCarByID(id);

        res.setHeader('Content-Type', 'application/json');
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

        const car = await db.createCar({
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

        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(car);
    };

    // PUT to /cars/{id}
    const updateCar = async (req: Request, res: Response) => {
        // TODO: Add middleware to check if the user has access rights to update a car

        const id = req.params.id;

        // TODO: get car with id from DB
        const car: Car = {
            id: id,
            make: 'Ford',
            model: 'Fusion',
            year: 2019,
            color: 'red',
            price: 300,
            image_url: '',
            createdAt: new Date(),
            updatedAt: new Date()
        };

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

        // Update car data
        car.make = body.make || car.make;
        car.model = body.model || car.model;
        car.year = body.year || car.year;
        car.color = body.color || car.color;
        car.price = body.price || car.price;
        car.updatedAt = new Date();

        // TODO: update car in the db

        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(car);
    };

    // DELETE to /cars/{id}
    const deleteCar = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ message: 'Invalid car id' });
            return;
        }

        // TODO: delete car from the db

        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({
            message: `Car with id ${id} was deleted`
        });
    };

    return {
        db,
        getCars,
        getCar,
        postCar,
        updateCar,
        deleteCar
    };
};

export { CarRepository, NewCarRepository };
