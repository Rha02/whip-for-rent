import Config from '@/config';
import { Request, Response } from 'express';

interface UserRepository {
  register: (req: Request, res: Response) => Promise<void>;
  login: (req: Request, res: Response) => Promise<void>;
  checkAuth: (req: Request, res: Response) => Promise<void>;
}

const NewUserRepository = (app: Config): UserRepository => {
    const register = async (req: Request, res: Response) => {
        // Get data from request body
        const { email, password, firstName, lastName } = req.body;

        // Validate data
        if (!email || !password || !firstName || !lastName) {
            res.header('Content-Type', 'application/json');
            res.status(400).send('Email, password, first name, and last name are required');
            return;
        }

        // TODO: Hash password 

        // TODO: Create user and add to the database

        // Create authentication token
        const token = app.authTokenRepo.createToken({ email, firstName });

        // Attach token to response header
        res.header('Authorization', 'Bearer ' + token);

        // Send response
        res.header('Content-Type', 'application/json');
        res.status(200).send({ msg: "Success" });
    };

    const login = async (req: Request, res: Response) => {
        // Get data from request body
        const { email, password } = req.body;

        // Validate data
        if (!email || !password) {
            res.status(400).send('Email and password are required');
            return;
        }

        // TODO: Fetch user from database by email
        // const user = await db.getUserByEmail(email);
        const user = "dummy";
        if (!user) {
            res.status(400).send('User not found');
            return;
        }

        // TODO: Check if user password hash matches request password hash

        // Create authentication token
        const token = app.authTokenRepo.createToken({ email, firstName: "dummy" });

        // Attach token to response header
        res.header('Authorization', 'Bearer ' + token);

        // Send response
        res.header('Content-Type', 'application/json');
        res.status(200).send({ msg: "Success" });
    };

    const checkAuth = async (req: Request, res: Response) => {
        // Get token from request header
        const token = req.header('Authorization') as string;
        if(!token) {
            res.status(401).send('Unauthenticated');
            return;
        }

        const cleanToken = token.replace('Bearer ', '');

        // TODO: Parse token with key to get the JSON object of the user
        const payload = app.authTokenRepo.parseToken(cleanToken);
        if (!payload) {
            res.status(401).send('Unauthenticated');
            return;
        }

        // Send response
        res.header('Content-Type', 'application/json');
        res.status(200).send(payload);
    };

    // Implement HTTP Request Handlers for Users here
    return {
        register,
        login,
        checkAuth
    };
};

export { UserRepository, NewUserRepository };
