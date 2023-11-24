"use client";
import { CarLocation } from "@/lib/types";
import { LocationRepo } from "@/repository";
import { useEffect, useState } from "react";

type CreateLocationModalProps = {
    onClose: () => void;
    onLocationCreated: (location: CarLocation) => void;
};

const CreateLocationModal = (props: CreateLocationModalProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const city = formData.get("city") as string;
        LocationRepo.addLocation({
            city,
            id: ""
        }).then((res) => {
            props.onLocationCreated(res);
            props.onClose();
        }).catch((err) => console.log(err));
    };

    return (
        <div className="relative z-10 w-full h-full">
            <div className="fixed inset-0 bg-gray-500 opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 flex justify-center items-center min-h-full">
                <div className="bg-white rounded-lg w-1/4 px-4 py-4">
                    <h2 className="text-center text-xl">
                        Creating a New Location
                    </h2>
                    <form className="mt-2" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-2">
                            <label className="text-gray-600 font-semibold" htmlFor="city">City</label>
                            <input className="px-2 py-1 bg-gray-100 rounded" type="text" name="city" placeholder="city" required />
                        </div>
                        <div className="flex justify-center gap-4 mt-2">
                            <button type="submit" className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                                Create
                            </button>
                            <button type="button" onClick={props.onClose} className="px-2 py-1 text-red-500 hover:text-red-600">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default function LocationsPanel() {
    const [locations, setLocations] = useState<CarLocation[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        LocationRepo.getLocations({}).then((res) => setLocations(res)).catch((err) => console.log(err));
    }, []);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Build a query
        const query = {} as any;

        const id = formData.get("id") as string;
        if (id && id.trim().length > 0) query.id = id.trim();

        const city = formData.get("city") as string;
        if (city && city.trim().length > 0) query.city = city.trim();

        LocationRepo.getLocations(query).then((res) => setLocations(res)).catch((err) => console.log(err));
    };

    const handleLocationCreated = (location: CarLocation) => {
        setLocations([...locations, location]);
    };

    return (
        <div>
            <div className="flex justify-center">
                <form onSubmit={handleSearch}>
                    <div className="flex flex-wrap justify-center gap-2">
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="id" className="px-1 py-0.5">Location ID</label>
                            <input name="id" type="text" className="px-1 bg-gray-50 w-28" />
                        </div>
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="user_id" className="px-1 py-0.5">City</label>
                            <input name="city" type="text" className="px-1 bg-gray-50 w-28" />
                        </div>
                    </div>
                    <div className="flex justify-center my-4 gap-4">
                        <button type="submit" className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition ease-in-out duration-150">
                            Search
                        </button>
                        <button type="submit" onClick={() => setShowCreateModal(true)} className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition ease-in-out duration-150">
                            Create
                        </button>
                    </div>
                </form>
            </div>
            <div className="">
                <div className="bg-gray-200 grid grid-cols-3 font-semibold">
                    <div className="border border-gray-600 px-2 py-1">
                        Location ID
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        City
                    </div>
                    <div className="border border-gray-600 px-2 py-1"></div>
                </div>
                {locations.map((location, idx) => (
                    <div key={location.id} className={`grid grid-cols-3 text-sm ${idx % 2 ? "bg-gray-100" : ""}`}>
                        <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                            {location.id}
                        </div>
                        <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                            {location.city}
                        </div>
                        <div className="border border-gray-600 px-2 py-1 flex justify-center gap-4">
                            <button className="px-2 bg-blue-600 text-white rounded">Edit</button>
                            <button className="px-2 bg-red-600 text-white rounded">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            { showCreateModal && <CreateLocationModal onClose={() => setShowCreateModal(false)} onLocationCreated={handleLocationCreated} />}
        </div>
    );
}