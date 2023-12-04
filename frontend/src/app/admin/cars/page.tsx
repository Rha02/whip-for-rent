"use client";
import { Car, CarLocation } from "@/lib/types";
import { CarRepo, LocationRepo } from "@/repository";
import { useEffect, useState } from "react";

type CreateCarModalProps = {
    onClose: () => void;
    onCarCreated: (car: Car) => void;
    locations: CarLocation[];
};

const CreateCarModal = (props: CreateCarModalProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const license = formData.get("license") as string;
        const make = formData.get("make") as string;
        const model = formData.get("model") as string;
        const year = parseInt(formData.get("year") as string);
        const color = formData.get("color") as string;
        const price = parseFloat(formData.get("price") as string);
        const image = formData.get("image") as File;
        const location = formData.get("location") as string;
        CarRepo.addCar({
            id: license,
            make: make,
            model: model,
            year: year,
            price: price,
            color: color,
            image: image,
            location_id: location
        }).then((res) => {
            props.onCarCreated(res);
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
                            <label className="text-gray-600 font-semibold" htmlFor="licence">License Plate</label>
                            <input className="px-2 py-1 bg-gray-100 rounded" type="text" name="license" placeholder="licence plate" required />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            <label className="text-gray-600 font-semibold" htmlFor="make">Make</label>
                            <input className="px-2 py-1 bg-gray-100 rounded" type="text" name="make" placeholder="make" required />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            <label className="text-gray-600 font-semibold" htmlFor="model">Model</label>
                            <input className="px-2 py-1 bg-gray-100 rounded" type="text" name="model" placeholder="model" required />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            <label className="text-gray-600 font-semibold" htmlFor="year">Year</label>
                            <input className="px-2 py-1 bg-gray-100 rounded" type="number" name="year" placeholder="year" required />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            <label className="text-gray-600 font-semibold" htmlFor="image">Image</label>
                            <input className="px-2 py-1 bg-gray-100 rounded " type="file" name="image" placeholder="image" required />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            <label className="text-gray-600 font-semibold" htmlFor="color">Color</label>
                            <input className="px-2 py-1 bg-gray-100 rounded" type="text" name="color" placeholder="color" required />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            <label className="text-gray-600 font-semibold" htmlFor="price">Price</label>
                            <input className="px-2 py-1 bg-gray-100 rounded" type="number" name="price" placeholder="price" required />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            <label className="text-gray-600 font-semibold" htmlFor="location">Location</label>
                            <select className="px-2 py-1 bg-gray-100 rounded" name="location" required>
                                {props.locations.map((location) => (
                                    <option key={location.id} value={location.id}>{location.city}</option>
                                ))}
                            </select>
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

export default function CarsPanel() {
    const [cars, setCars] = useState<Car[]>([]);
    const [locations, setLocations] = useState<CarLocation[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        CarRepo.getCars({}).then((res) => setCars(res)).catch((err) => console.log(err));
        LocationRepo.getLocations({}).then((res) => setLocations(res)).catch((err) => console.log(err));
    }, []);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const query = {} as any;

        const id = formData.get("id") as string;
        if (id && id.trim().length > 0) query.id = id.trim();

        const make = formData.get("make") as string;
        if (make && make.trim().length > 0) query.make = make.trim();

        const model = formData.get("model") as string;
        if (model && model.trim().length > 0) query.model = model.trim();

        const year = formData.get("year") as string;
        if (year && year.trim().length > 0) query.year = year.trim();

        const color = formData.get("color") as string;
        if (color && color.trim().length > 0) query.color = color.trim();

        const location = formData.get("location") as string;
        if (location && location.trim().length > 0) query.location_id = location.trim();

        CarRepo.getCars(query).then((res) => setCars(res)).catch((err) => console.log(err));
    };

    const handleCarCreated = (car: Car) => {
        setCars([...cars, car]);
    };

    return (
        <div>
            <div className="flex justify-center">
                <form onSubmit={handleSearch}>
                    <div className="flex flex-wrap justify-center gap-2">
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="id" className="px-1 py-0.5">License Plate</label>
                            <input name="id" type="text" className="px-1 bg-gray-50 w-28" />
                        </div>
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="make" className="px-1 py-0.5">Make</label>
                            <input name="make" type="text" className="px-1 bg-gray-50 w-28" />
                        </div>
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="model" className="px-1 py-0.5">Model</label>
                            <input name="model" type="text" className="px-1 bg-gray-50 w-28" />
                        </div>
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="year" className="px-1 py-0.5">Year</label>
                            <input name="year" type="text" className="px-1 bg-gray-50 w-16" />
                        </div>
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="color" className="px-1 py-0.5">Color</label>
                            <input name="color" type="text" className="px-1 bg-gray-50 w-28" />
                        </div>
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="location" className="px-1 py-0.5">Location</label>
                            <input name="location" type="text" className="px-1 bg-gray-50 w-28" />
                        </div>
                        <div></div>
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
                <div className="bg-gray-200 grid grid-cols-9 font-semibold">
                    <div className="border border-gray-600 px-2 py-1">
                        License plate
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Make
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Model
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Year
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Color
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Price
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Location
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Created at
                    </div>
                    <div className="border border-gray-600 px-2 py-1"></div>
                </div>
                {cars.map((car, idx) => (
                    <div key={car.id} className={`grid grid-cols-9 text-sm ${idx % 2 ? "bg-gray-100" : ""}`}>
                        <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                            {car.id}
                        </div>
                        <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                            {car.make}
                        </div>
                        <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                            {car.model}
                        </div>
                        <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                            {car.year}
                        </div>
                        <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                            {car.color}
                        </div>
                        <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                            {car.price}
                        </div>
                        <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                            {car.location_id}
                        </div>
                        <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                            {car.createdAt ? new Date(car.createdAt).toLocaleDateString() : ""}
                        </div>
                        <div className="border border-gray-600 px-2 py-1 flex justify-center gap-4">
                            <button className="px-2 bg-blue-600 text-white rounded">Edit</button>
                            <button className="px-2 bg-red-600 text-white rounded">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {showCreateModal && <CreateCarModal onClose={() => setShowCreateModal(false)} onCarCreated={handleCarCreated} locations={locations} />}
        </div>
    );
}