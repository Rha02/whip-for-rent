"use client";
import { Cog } from "@/lib/icons";
import { Car } from "@/lib/types";
import { CarRepo } from "@/repository";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
    const [cars, setCars] = useState<Car[]>([]);
    
    // Fetch cars from the backend
    useEffect(() => {
        CarRepo.getCars().then((cars) => setCars(cars));
    });

    const searchHandler = () => {
        // TODO: Implement search and advanced search functionality
        console.log("Search button clicked!");
    };

    return (
        <main className="text-center text-gray-800">
            <h1 className="text-4xl font-semibold">Car Listings</h1>
            <div className="flex justify-center mt-4 gap-2">
                <div className="w-1/6"></div>
                <div className="flex rounded-lg border border-teal-500 w-1/3 xl:w-1/4 bg-teal-500 align-center">
                    <label htmlFor="end" className="px-3 py-2 text-white">Start Date</label>
                    <input type="date" className="px-2 grow bg-teal-50 text-teal-800" />
                </div>
                <div className="flex rounded-lg border border-teal-500 w-1/3 xl:w-1/4 bg-teal-500 align-center">
                    <label htmlFor="end" className="px-3 py-2 text-white">End Date</label>
                    <input type="date" className="px-2 grow bg-teal-50 text-teal-800" />
                </div>
                <button onClick={searchHandler} className="rounded-lg px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 transition ease-in-out">
                    Search
                </button>
                <div className="w-1/6 flex">
                    <button onClick={() => setIsAdvancedSearch(!isAdvancedSearch)} className="rounded-lg hover:bg-teal-100 transition ease-in-out">
                        <Cog width={42} height={42} color="#065f46" />
                    </button>
                </div>
            </div>
            {isAdvancedSearch && (
                <div className="">
                    Advanced Search!
                </div>
            )}
            <div>
                {cars.map((car) => (
                    <div key={car.id}>
                        <h2>{car.make} {car.model}</h2>
                        <p>{car.year}</p>
                        <p>{car.price}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}