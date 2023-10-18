import Config from '@/config';
import { User } from '@/models';
import { RequestWithUser } from '@/types';
import { Request, Response } from 'express';

interface UserRepository {
    register: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
    checkAuth: (req: RequestWithUser, res: Response) => Promise<void>;
}

const NewUserRepository = (app: Config): UserRepository => {
    interface PostUserRequestBody {
        id?: number;
        email?: string;
        password?: string;
        firstName?: string;
        lastName?: string;
        access_level?: number;
    }
    const register = async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');

        // Get data from request body
        const body = req.body as PostUserRequestBody;

        // Validate data
        if(!body.id || isNaN(body.id)) {
            res.status(400).json({ message: 'Invalid driver license number' });
            return;
        }

        if(!body.email) {
            res.status(400).json({ message: 'Missing email' });
            return;
        }

        if(!body.firstName) {
            res.status(400).json({ message: 'Missing first name' });
            return;
        }

        if(!body.lastName) {
            res.status(400).json({ message: 'Missing last name' });
            return;
        }

        if(!body.password) {
            res.status(400).json({ message: 'Missing password' });
            return;
        }

        // TODO: Hash password 

        // TODO: Create user and add to the database
        const user = await app.db.createUser({
            id: body.id,
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            password: body.password,
            access_level: 3
        });
        if (!user) {
            res.status(500).send('DB error creating user');
            return;
        }

        // Create authentication token
        const token = app.authTokenRepo.createToken({ 
            email: body.email, 
            firstName: body.firstName,
            accessLevel: user.access_level
        });

        // Attach token to response header
        res.header('Authorization', 'Bearer ' + token);

        res.status(201).json(user);
    };

    const login = async (req: Request, res: Response) => {
        res.header('Content-Type', 'application/json');

        // Get data from request body
        const body = req.body as PostUserRequestBody;

        // Validate data
        if(!body.email) {
            res.status(400).json({ message: 'Missing email' });
            return;
        }

        if(!body.password) {
            res.status(400).json({ message: 'Missing password' });
            return;
        }

        // TODO: Fetch user from database by email
        // const user = await db.getUserByEmail(email);
        const user = await app.db.getUserByEmail(body.email);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }

        // TODO: Check if user password hash matches request password hash

        // Create authentication token
        const token = app.authTokenRepo.createToken({ 
            email: user.email, 
            firstName: user.firstName,
            accessLevel: user.access_level
        });

        // Attach token to response header
        res.header('Authorization', 'Bearer ' + token);

        res.status(201).json(user);
    };

    const checkAuth = async (req: RequestWithUser, res: Response) => {
        // Get authenticated user
        const user = await req.user?.() as User;

        res.header('Content-Type', 'application/json');
        res.status(200).send(user);
    };

    // Implement HTTP Request Handlers for Users here
    return {
        register,
        login,
        checkAuth
    };
};

export { UserRepository, NewUserRepository };
