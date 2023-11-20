"use client";
import { CarLocation } from "@/lib/types";
import { LocationRepo } from "@/repository";
import { useEffect, useState } from "react";

export default function LocationsPanel() {
    const [locations, setLocations] = useState<CarLocation[]>([]);

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
                        <button type="submit" className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition ease-in-out duration-150">
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
        </div>
    );
}