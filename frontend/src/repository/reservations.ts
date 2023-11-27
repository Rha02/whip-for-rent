import { Reservation } from "@/lib/types";
import reservations from "@/testdata/reservations";

type getReservationsParams = {
    id?: string;
    user_id?: string;
    car_id?: string;
    start_date?: Date;
    end_date?: Date;
}

type addReservationBody = {
    car_id: string;
    start_date: Date;
    end_date: Date;
}

// Omit user_id from Reservation
type getCarReservationsResponse = Omit<Reservation, "user_id" | "id" | "car_id">;

interface ReservationRepository {
    /**
     * getReservations() returns a list of reservations from the backend.
     * @param params 
     */
    getReservations(params?: getReservationsParams): Promise<Reservation[]>;

    /**
     * getCarReservations() returns a list of reservations for a car from the backend.
     */
    getCarReservations(car_id: string): Promise<getCarReservationsResponse[]>;

    /**
     * addReservation() creates a reservation in the backend.
     */
    addReservation(reservation: addReservationBody): Promise<Reservation>;

    /**
     * deleteReservations() deletes a reservation by id from the backend.
     */
    deleteReservation(id: string): Promise<boolean>;
}

const NewReservationRepository = (host: string): ReservationRepository => {
    const getReservations = async (params?: getReservationsParams): Promise<Reservation[]> => {   
        console.log(params);

        return reservations;
    };

    const getCarReservations = async (car_id: string): Promise<getCarReservationsResponse[]> => {
        let token = document.cookie.split("; ").find(row => row.startsWith("authtoken"));
        if (!token) {
            throw new Error("No token found");
        }
        token = token.split("=")[1];
        token = token.replace(/%20/g, " ");

        return fetch(`${host}/cars/${car_id}/reservations`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        }).then(async (res) => {
            const data = await res.json();
            console.log(data);
            return data;
        }).catch((err) => {
            console.log(err);
        });
    };

    const addReservation = async (reservation: addReservationBody): Promise<Reservation> => {
        // get token from cookies
        let token = document.cookie.split("; ").find(row => row.startsWith("authtoken"));
        if (!token) {
            throw new Error("No token found");
        }
        token = token.split("=")[1];
        token = token.replace(/%20/g, " ");

        return fetch(`${host}/reservations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(reservation)
        }).then(async (res) => {
            const data = await res.json();
            console.log(data);
            return data;
        }).catch((err) => {
            console.log(err);
        });
    };

    const deleteReservation = async (id: string): Promise<boolean> => {
        console.log(id);
        return true;
    };

    return {
        getReservations,
        getCarReservations,
        addReservation,
        deleteReservation
    };
};

export default NewReservationRepository;