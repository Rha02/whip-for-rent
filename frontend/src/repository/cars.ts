import { Car } from "@/lib/types";

interface CarRepository {
    getCars(): Promise<Car[]>;
}

const NewCarRepository = (host: string): CarRepository => {
    const getCars = async (): Promise<Car[]> => {
        const response = await fetch(`${host}/cars`);
        return await response.json();
    };

    return { getCars };
};

export default NewCarRepository;