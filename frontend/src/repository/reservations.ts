import { Reservation } from "@/lib/types";
import reservations from "@/testdata/reservations";

interface getReservationsParams {
    id?: string;
    user_id?: string;
    car_id?: string;
    start_date?: Date;
    end_date?: Date;
}

interface ReservationRepository {
    /**
     * getReservations() returns a list of cars from the backend.
     * @param params 
     */
    getReservations(params?: getReservationsParams): Promise<Reservation[]>;

    /**
     * deleteReservations() takes a car make and returns a list of car models from the backend.
     */
    deleteReservation(id: string): Promise<boolean>;
}

const NewReservationRepository = (host: string): ReservationRepository => {
    console.log(host);

    const getReservations = async (params?: getReservationsParams): Promise<Reservation[]> => {   
        console.log(params);

        return reservations;
    };

    const deleteReservation = async (id: string): Promise<boolean> => {
        console.log(id);
        return true;
    };

    return {
        getReservations,
        deleteReservation
    };
};

export default NewReservationRepository;