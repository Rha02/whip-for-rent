import Config from '@/config';
import { GetCarsFilter, RequestWithUser } from '@/types';
import { Request, Response } from 'express';

interface CarRepository {
    getCars: (req: Request, res: Response) => Promise<void>;
    getCar: (req: Request, res: Response) => Promise<void>;
    postCar: (req: RequestWithUser, res: Response) => Promise<void>;
    updateCar: (req: RequestWithUser, res: Response) => Promise<void>;
    deleteCar: (req: RequestWithUser, res: Response) => Promise<void>;
    getCarMakes: (req: Request, res: Response) => Promise<void>;
    getCarMakeModels: (req: Request, res: Response) => Promise<void>;
    getCarColors: (req: Request, res: Response) => Promise<void>;
}

const NewCarRepository = (app: Config): CarRepository => {
    interface ResponseCarBody {
        id: string;
        make: string;
        model: string;
        year: number;
        color: string;
        price: number;
        image_url: string;
        location_id: number;
        createdAt: Date;
        updatedAt: Date;
    }

    interface PostCarRequestBody {
        id?: string;
        make?: string;
        model?: string;
        year?: number;
        color?: string;
        price?: number;
        location_id?: number;
    }

    const getCars = async (req: Request, res: Response) => {
        const filter: GetCarsFilter = req.query;
        filter.start_date = filter.start_date ? new Date(filter.start_date) : undefined;
        filter.end_date = filter.end_date ? new Date(filter.end_date) : undefined;
        
        // Get cars from the db
        const cars = await app.db.getCars(filter);

        // Create response body 
        const resBody: Promise<ResponseCarBody>[] = cars.map((car) => {
            return app.imageStorage.getFileUrl(car.image_name).then((image_url) => {
                return {
                    id: car.id,
                    make: car.make,
                    model: car.model,
                    year: car.year,
                    color: car.color,
                    price: car.price,
                    location_id: car.location_id,
                    image_url: image_url,
                    createdAt: car.createdAt as Date,
                    updatedAt: car.updatedAt as Date
                };
            });
        });

        // Await all promises
        const resBodyResolved = await Promise.all(resBody);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(resBodyResolved);
    };

    // GET to /cars/{id}
    const getCar = async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');

        // Get the car id from the request
        const id = req.params.id;

        // Get a car by id from the db
        const car = await app.db.getCarByID(id);
        if (!car) {
            res.status(404).json({ message: `Car with id ${id} not found` });
            return;
        }

        // Get image url from the image storage
        const image_url = await app.imageStorage.getFileUrl(car.image_name);

        // Get location from the db
        const location = await app.db.getLocationByID(car.location_id);
        if (!location) {
            res.status(404).json({ message: `Location with id ${car.location_id} not found` });
            return;
        }

        // Construct response body
        const resBody = {
            id: car.id,
            make: car.make,
            model: car.model,
            year: car.year,
            color: car.color,
            price: car.price,
            image_url: image_url,
            location: location.city,
            createdAt: car.createdAt as Date,
            updatedAt: car.updatedAt as Date
        };

        res.status(200).json(resBody);
    };

    // POST to /cars
    const postCar = async (req: RequestWithUser, res: Response) => {
        res.setHeader('Content-Type', 'application/json');

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

        if (!body.location_id) {
            res.status(400).json({ message: 'Missing car location' });
            return;
        }

        // Check if car already exists
        const carExists = await app.db.getCarByID(body.id);
        if (carExists) {
            res.status(400).json({ message: `Car with id ${body.id} already exists` });
            return;
        }

        // handle image submission
        let image_name = '';
        const image = req.file;
        if (image) {
            image_name = await app.imageStorage.uploadFile(image);
        }

        const car = await app.db.createCar({
            id: body.id,
            make: body.make,
            model: body.model,
            year: body.year,
            color: body.color,
            price: body.price,
            image_name: image_name,
            location_id: body.location_id
        });
        if (!car) {
            res.status(500).json({ message: 'Failed to create car' });
            return;
        }

        const image_url = await app.imageStorage.getFileUrl(car.image_name);

        const resBody = {
            id: car.id,
            make: car.make,
            model: car.model,
            year: car.year,
            color: car.color,
            price: car.price,
            image_url: image_url,
            location_id: car.location_id,
            createdAt: car.createdAt as Date,
            updatedAt: car.updatedAt as Date
        };

        res.status(201).json(resBody);
    };

    // PUT to /cars/{id}
    const updateCar = async (req: RequestWithUser, res: Response) => {
        res.setHeader('Content-Type', 'application/json');

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

        // handle image submission
        let image_name = car.image_name;
        const image = req.file;
        if (image) {
            image_name = await app.imageStorage.uploadFile(image);
            // Delete old car image from the image storage
            await app.imageStorage.deleteFile(car.image_name);
        }

        // Update car in the db
        car = await app.db.updateCar({
            id: id,
            make: body.make || car.make,
            model: body.model || car.model,
            year: body.year || car.year,
            color: body.color || car.color,
            price: body.price || car.price,
            image_name: image_name || car.image_name,
            location_id: body.location_id || car.location_id
        });
        if (!car) {
            res.status(500).json({ message: 'Failed to update car' });
            return;
        }

        // Get image url from the image storage
        const image_url = await app.imageStorage.getFileUrl(car.image_name);

        // Construct response body
        const resBody: ResponseCarBody = {
            id: car.id,
            make: car.make,
            model: car.model,
            year: car.year,
            color: car.color,
            price: car.price,
            image_url: image_url,
            location_id: car.location_id,
            createdAt: car.createdAt as Date,
            updatedAt: car.updatedAt as Date
        };

        res.status(201).json(resBody);
    };

    // DELETE to /cars/{id}
    const deleteCar = async (req: RequestWithUser, res: Response) => {
        res.setHeader('Content-Type', 'application/json');

        const id = req.params.id;
        const car = await app.db.getCarByID(id);
        if (!car) {
            res.status(404).json({ message: `Car with id ${id} not found` });
            return;
        }

        // Delete car image from the image storage
        await app.imageStorage.deleteFile(car.image_name);

        // Delete car from the db
        await app.db.deleteCar(id.toString());

        res.status(201).json({
            message: `Car with id ${id} was deleted`
        });
    };

    const getCarMakes = async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');

        const makes = await app.db.getCarMakes();

        res.status(200).json(makes);
    };

    const getCarMakeModels = async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');

        const make = req.params.make;

        const models = await app.db.getCarMakeModels(make);

        res.status(200).json(models);
    };

    const getCarColors = async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');

        const colors = await app.db.getCarColors();

        res.status(200).json(colors);
    };

    return {
        getCars,
        getCar,
        postCar,
        updateCar,
        deleteCar,
        getCarMakes,
        getCarMakeModels,
        getCarColors
    };
};

export { CarRepository, NewCarRepository };
