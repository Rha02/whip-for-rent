import { CarLocation } from "@/lib/types";
import locations from "@/testdata/locations";

interface getLocationsParams {
    id?: string;
    city?: string;
}

interface LocationRepository {
    /**
     * getLocations() returns a list of locations from the backend.
     */
    getLocations(query?: getLocationsParams): Promise<CarLocation[]>;

    /**
     * deleteLocation() takes a location id and deletes it from the backend.
     */
    deleteLocation(id: string): Promise<boolean>;

    /**
     * addLocation() takes a location object and adds it to the backend.
     */
    addLocation(location: CarLocation): Promise<CarLocation>;
}

const NewLocationRepository = (host: string): LocationRepository => {
    console.log(host);

    const getLocations = async (query: getLocationsParams): Promise<CarLocation[]> => {
        return fetch(`${host}/locations`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (res) => {
            const data = await res.json();
            console.log(data);
            return data;
        }).catch((err) => {
            console.log(err);
        });
    };

    const deleteLocation = async (id: string): Promise<boolean> => {
        console.log(id);
        return true;
    };

    const addLocation = async (location: CarLocation): Promise<CarLocation> => {
        return fetch(`${host}/locations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(location)
        }).then(async (res) => {
            const data = await res.json();
            console.log(data);
            return data[0];
        }).catch((err) => {
            console.log(err);
        });
    };

    return {
        getLocations,
        deleteLocation,
        addLocation
    };
};

export default NewLocationRepository;