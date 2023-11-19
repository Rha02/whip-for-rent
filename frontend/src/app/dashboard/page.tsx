"use client";
import { CarCard } from "@/lib/components/client";
import { Cog } from "@/lib/icons";
import { Car } from "@/lib/types";
import { CarRepo } from "@/repository";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
    const [cars, setCars] = useState<Car[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [makes, setMakes] = useState<string[]>([]);
    const [models, setModels] = useState<string[]>([]);

    // Fetch cars from the backend
    useEffect(() => {
        CarRepo.getCars().then((res) => setCars(res)).catch((err) => console.log(err));
        CarRepo.getColors().then((res) => setColors(res)).catch((err) => console.log(err));
        CarRepo.getMakes().then((makes) => setMakes(makes));
    }, []);

    const modelHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const make = e.currentTarget.value;
        CarRepo.getMakeModels(make).then((models) => setModels(models));
    };

    const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(e.currentTarget);
        const startDate = formData.get("startDate") as string;
        const endDate = formData.get("endDate") as string;
        const make = formData.get("make") as string;
        const model = formData.get("model") as string;
        const year = formData.get("year") as string;
        const color = formData.get("color") as string;

        CarRepo.getCars({
            make,
            model,
            year: year,
            color,
            start: startDate,
            end: endDate
        });
    };

    return (
        <main className="text-center text-gray-800">
            <h1 className="text-4xl font-semibold">Car Listings</h1>
            <div>
                <form onSubmit={searchHandler}>
                    <div className="flex justify-center mt-4 gap-2">
                        <div className="w-1/6"></div>
                        <div className="flex rounded-lg border border-teal-500 w-1/3 xl:w-1/4 bg-teal-500 align-center">
                            <label htmlFor="startDate" className="px-3 py-2 text-white">Start Date</label>
                            <input name="startDate" type="date" className="px-2 grow bg-teal-50 text-teal-800" />
                        </div>
                        <div className="flex rounded-lg border border-teal-500 w-1/3 xl:w-1/4 bg-teal-500 align-center">
                            <label htmlFor="endDate" className="px-3 py-2 text-white">End Date</label>
                            <input name="endDate" type="date" className="px-2 grow bg-teal-50 text-teal-800" />
                        </div>
                        <button type="submit" className="rounded-lg px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 transition ease-in-out">
                            Search
                        </button>
                        <div className="w-1/6 flex">
                            <button type="button" onClick={() => setIsAdvancedSearch(!isAdvancedSearch)} className="rounded-lg hover:bg-slate-100 transition ease-in-out">
                                <Cog width={42} height={42} color="#475569" />
                            </button>
                        </div>
                    </div>
                    {isAdvancedSearch && (
                        <div className="mt-4 flex justify-center gap-4">
                            <div className="flex rounded-lg border border-gray-500 bg-gray-500 align-center">
                                <label htmlFor="make" className="px-2 py-1 text-white">Make</label>
                                <select name="make" className="px-1 bg-gray-50" onChange={modelHandler}>
                                    <option value="">Pick a make...</option>
                                    {makes.map((make) => (
                                        <option key={make} value={make}>{make}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex rounded-lg border border-gray-500 bg-gray-500 align-center">
                                <label htmlFor="model" className="px-2 py-1 text-white">Model</label>
                                <select name="model" className="px-1 bg-gray-50">
                                    <option value="">Pick a model...</option>
                                    {models.map((model) => (
                                        <option key={model} value={model}>{model}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex rounded-lg border border-gray-500 bg-gray-500 align-center">
                                <label htmlFor="year" className="px-2 py-1 text-white">Year</label>
                                <input type="text" name="year" className="px-1 bg-gray-50 w-24" placeholder="Enter year" />
                            </div>
                            <div className="flex rounded-lg border border-gray-500 bg-gray-500 align-center">
                                <label htmlFor="color" className="px-2 py-1 text-white">Color</label>
                                <select name="color" className="px-1 bg-gray-50">
                                    <option value="">Pick a color...</option>
                                    {colors.map((color) => (
                                        <option key={color} value={color}>{color}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                </form>
            </div>
            <div className="flex justify-center mt-8">
                <div className="grid grid-cols-5 w-3/4 gap-4">
                    {cars.map((car) => (
                        <CarCard car={car} key={car.id} />
                    ))}
                </div>
            </div>
        </main>
    );
}