import Config from '@/config';
import { CarLocation } from '@/models'; 
import { Request, Response } from 'express';

interface CarLocationRepository {
    getLocations: (req: Request, res: Response) => Promise<void>;
    deleteLocation: (req: Request, res: Response) => Promise<void>;
    updateLocation: (req: Request, res: Response) => Promise<void>;
    createLocation: (req: Request, res: Response) => Promise<void>;
}

const NewCarLocationRepository = (app: Config): CarLocationRepository => {
    interface PostLocationRequestBody {
        city?: string;
    }

    // GET to /car-locations
    const getLocations = async (_req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');

        try {
            const locations = await app.db.getLocations();
            res.status(200).json(locations);
        } catch (error) {
            console.error('Error getting car locations:', error);
            res.status(500).json({ error: 'Failed getting car locations' });
        }
    };

    // DELETE to /car-locations/{id}
    const deleteLocation = async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');

        const id = +req.params.id;

        try {
            await app.db.deleteLocation(id);
            res.status(200).json({ message: 'Car location deleted successfully' });
        } catch (error) {
            console.error('Error deleting car location:', error);
            res.status(500).json({ error: 'Failed to delete car location' });
        }
    };

    // PUT to /car-locations/{id}
    const updateLocation = async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');

        const id = +req.params.id;
        const updatedLocation: CarLocation = req.body;

        try {
            const updatedLocations = await app.db.updateLocation({ id, ...updatedLocation });
            res.status(200).json(updatedLocations);
        } catch (error) {
            console.error('Error updating car location:', error);
            res.status(500).json({ error: 'Failed to update car location' });
        }
    };

    // POST to /car locations
    const createLocation = async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');

        const body = req.body as PostLocationRequestBody;

        // Validate data
        if (!body.city) {
            res.status(400).json({ message: 'Missing city in request body' });
            return;
        }

        try {
            const createdLocations = await app.db.createLocation({ city: body.city });
            res.status(201).json(createdLocations);
        } catch (error) {
            console.error('Error creating car location:', error);
            res.status(500).json({ error: 'Failed to create car location' });
        }
    };

    return {
        getLocations,
        deleteLocation,
        updateLocation,
        createLocation,
    };
};

export { CarLocationRepository, NewCarLocationRepository };
