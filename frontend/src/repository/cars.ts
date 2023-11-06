import { Car } from "@/lib/types";

interface getCarsParams {
    make?: string;
    model?: string;
    year?: string;
    color?: string;
    start?: string;
    end?: string;
}

interface CarRepository {
    /**
     * getCars() returns a list of cars from the backend.
     * @param params 
     */
    getCars(params?: getCarsParams): Promise<Car[]>;

    /**
     * getCarMakes() takes a car make and returns a list of car models from the backend.
     */
    getMakeModels(make: string): Promise<string[]>;

    /**
     * getCarMakes() returns a list of car makes from the backend.
     */
    getMakes(): Promise<string[]>;

    /**
     * getColors() returns a list of car colors from the backend.
     */
    getColors(): Promise<string[]>;
}

const NewCarRepository = (host: string): CarRepository => {
    const getCars = async (params?: getCarsParams): Promise<Car[]> => {
        const url = new URL(`${host}/cars`);
        if (params) {
            if (params.make) url.searchParams.append("make", params.make);
            if (params.model) url.searchParams.append("model", params.model);
            if (params.year) url.searchParams.append("year", params.year);
            if (params.color) url.searchParams.append("color", params.color);
            if (params.start) url.searchParams.append("start", params.start.toString());
            if (params.end) url.searchParams.append("end", params.end.toString());
        }
        console.log(url.href);

        const response = await fetch(url.href);
        return response.json();
    };

    const getMakeModels = async (make: string): Promise<string[]> => {
        const response = await fetch(`${host}/car-makes/models`);
        return response.json();
    };

    const getMakes = async (): Promise<string[]> => {
        const response = await fetch(`${host}/car-makes`);
        return response.json();
    };

    const getColors = async (): Promise<string[]> => {
        const response = await fetch(`${host}/car-colors`);
        return response.json();
    };

    return { getCars, getMakeModels, getMakes, getColors };
};

export default NewCarRepository;