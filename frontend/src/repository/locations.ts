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
}

const NewLocationRepository = (host: string): LocationRepository => {
    console.log(host);

    const getLocations = async (query: getLocationsParams): Promise<CarLocation[]> => {
        console.log(query);
        return locations;
    };

    const deleteLocation = async (id: string): Promise<boolean> => {
        console.log(id);
        return true;
    };

    return {
        getLocations,
        deleteLocation
    };
};

export default NewLocationRepository;