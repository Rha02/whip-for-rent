import DatabaseRepository from '@dbrepo/repository';
import { Request, Response } from 'express';

interface CarRepository {
    db: DatabaseRepository;
    getCars: (req: Request, res: Response) => Promise<unknown>;
    getCar: (req: Request, res: Response) => Promise<unknown>;
    postCar: (req: Request, res: Response) => Promise<unknown>;
}

const NewCarRepository = (db: DatabaseRepository): CarRepository => {
    // Implement HTTP Request Handlers for Cars here
    return {
        db,
        // GET to /cars
        getCars: async (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                message: 'Get all cars'
            });
        },
        // GET to /cars/{id}
        getCar: async (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                message: 'Get car by ID'
            });
        },
        // POST to /cars
        postCar: async (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(201).json({
                message: 'Post a new car'
            });
        }
    };
};

export { CarRepository, NewCarRepository };
