import { Car, CarWithLocation } from "@/lib/types";

interface getCarsParams {
    id?: string;
    make?: string;
    model?: string;
    year?: string;
    color?: string;
    start?: string;
    end?: string;
    location_id?: string;
}

type addCarParams = {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    color: string;
    location_id: string;
    image: File;
}

interface CarRepository {
    /**
     * getCars() returns a list of cars from the backend.
     * @param params 
     */
    getCars(params?: getCarsParams): Promise<Car[]>;

    /**
     * getCar() returns a car from the backend.
     */
    getCar(id: string): Promise<CarWithLocation | null>;

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

    /**
     * addCar() takes a car object and adds it to the backend.
     */
    addCar(car: addCarParams): Promise<Car>;
}

const NewCarRepository = (host: string): CarRepository => {
    const getCars = async (params?: getCarsParams): Promise<Car[]> => {
        const url = new URL(`${host}/cars`);
        if (params) {
            if (params.id) url.searchParams.append("id", params.id);
            if (params.make) url.searchParams.append("make", params.make);
            if (params.model) url.searchParams.append("model", params.model);
            if (params.year) url.searchParams.append("year", params.year);
            if (params.color) url.searchParams.append("color", params.color);
            if (params.start) url.searchParams.append("start", params.start.toString());
            if (params.end) url.searchParams.append("end", params.end.toString());
            if (params.location_id) url.searchParams.append("location_id", params.location_id);
        }
        console.log(url.href);

        return fetch(url.href, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(async (res) => {
            const data = await res.json();
            console.log(data);
            return data;
        }).catch((err) => {
            console.log(err);
        });
    };

    const getMakeModels = async (make: string): Promise<string[]> => {
        const response = await fetch(`${host}/car-makes/${make}/models`);
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

    const addCar = async (car: addCarParams): Promise<Car> => {
        const formData = new FormData();
        formData.append("id", car.id);
        formData.append("make", car.make);
        formData.append("model", car.model);
        formData.append("year", car.year.toString());
        formData.append("price", car.price.toString());
        formData.append("color", car.color);
        formData.append("location_id", car.location_id);
        formData.append("image", car.image);

        // get token from cookies
        console.log(document.cookie);
        let token = document.cookie.split("; ").find(row => row.startsWith("authtoken"));
        if (!token) {
            throw new Error("No token found");
        }
        token = token.split("=")[1];
        token = token.replace(/%20/g, " ");

        return fetch(`${host}/cars`, {
            method: "POST",
            headers: {
                "Authorization": token
            },
            body: formData
        }).then(async (res) => {
            const data = await res.json();
            console.log(data);
            return data;
        }).catch((err) => {
            console.log(err);
        });
    };

    const getCar = async (id: string): Promise<CarWithLocation | null> => {
        const response = await fetch(`${host}/cars/${id}`);
        if (response.status === 404) {
            return null;
        }
        return response.json();
    };

    return { getCars, getMakeModels, getMakes, getColors, addCar, getCar };
};

export default NewCarRepository;