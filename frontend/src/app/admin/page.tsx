"use client";

import { Car, CarLocation, Reservation, User } from "@/lib/types";
import { CarRepo, LocationRepo, ReservationRepo, UserRepo } from "@/repository";
import { useEffect, useState } from "react";

type UsersSearchQuery = {
    license?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
};

type UsersPageProps = {
    users: User[];
    onSearch: (query: UsersSearchQuery) => void;
};

const UsersPage = (props: UsersPageProps) => {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Build a query
        const query: UsersSearchQuery = {};
        const license = formData.get("license") as string;
        if (license && license.trim().length > 0) query.license = license.trim();

        const email = formData.get("email") as string;
        if (email && email.trim().length > 0) query.email = email.trim();

        const first_name = formData.get("first_name") as string;
        if (first_name && first_name.trim().length > 0) query.first_name = first_name.trim();

        const last_name = formData.get("last_name") as string;
        if (last_name && last_name.trim().length > 0) query.last_name = last_name.trim();

        console.log(query);
        props.onSearch(query);
    };
    
    return (
        <div>
            <div className="flex justify-center">
                <form onSubmit={handleSearch}>
                    <div className="flex flex-wrap justify-center gap-2">
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="license" className="px-1 py-0.5">Driver License</label>
                            <input name="license" type="text" className="px-1 bg-gray-50 w-28" />
                        </div>
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="email" className="px-1 py-0.5">Email</label>
                            <input name="email" type="email" className="px-1 bg-gray-50 w-28" />
                        </div>
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="first_name" className="px-1 py-0.5">First Name</label>
                            <input name="first_name" type="text" className="px-1 bg-gray-50 w-28" />
                        </div>
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="last_name" className="px-1 py-0.5">Last Name</label>
                            <input name="last_name" type="text" className="px-1 bg-gray-50 w-28" />
                        </div>
                        <div></div>
                    </div>
                    <div className="flex justify-center my-4">
                        <button type="submit" className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition ease-in-out duration-150">
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <div className="">
                <div className="bg-gray-200 grid grid-cols-7 font-semibold">
                    <div className="border border-gray-600 px-2 py-1">
                        Driver license
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Email
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        First name
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Last name
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Role
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Created at
                    </div>
                    <div className="border border-gray-600 px-2 py-1"></div>
                </div>
                <div className="grid grid-cols-7 text-sm">
                    <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                        123456780
                    </div>
                    <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                        john.doe@wfr.loc
                    </div>
                    <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                        John
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Doe
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Client
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        November 10, 2023
                    </div>
                    <div className="border border-gray-600 px-2 py-1 flex justify-center gap-4">
                        <button className="px-2 bg-blue-600 text-white rounded">Edit</button>
                        <button className="px-2 bg-red-600 text-white rounded">Delete</button>
                    </div>
                </div>
                <div className="grid grid-cols-7 bg-gray-100 text-sm">
                    <div className="border border-gray-600 px-2 py-1">
                        8542698903245
                    </div>
                    <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                        boom.boombox@wfr.loc
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        John
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Doe
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Client
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        November 10, 2023
                    </div>
                    <div className="border border-gray-600 px-2 py-1 flex justify-center gap-4">
                        <button className="px-2 bg-blue-600 text-white rounded">Edit</button>
                        <button className="px-2 bg-red-600 text-white rounded">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

type CarsSearchQuery = {
    id?: string;
    make?: string;
    model?: string;
    year?: string;
    color?: string;
    location_id?: string;
};

type CarsPageProps = {
    cars: Car[];
    onSearch: (query: CarsSearchQuery) => void;
};

const CarsPage = (props: CarsPageProps) => {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Build a query
        const query: CarsSearchQuery = {};
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

        props.onSearch(query);
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
                        <button type="submit" className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition ease-in-out duration-150">
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
                { props.cars.map((car, idx) => (
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
                            1
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
        </div>
    );
};

type ReservationsSearchQuery = {
    id?: string;
    user_id?: string;
    car_id?: string;
    start_date?: Date;
    end_date?: Date;
}

type ReservationsPageProps = {
    reservations: Reservation[];
    onSearch: (query: ReservationsSearchQuery) => void;
};

const ReservationsPage = (props: ReservationsPageProps) => {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Build a query
        const query: ReservationsSearchQuery = {};
        
        const id = formData.get("id") as string;
        if (id && id.trim().length > 0) query.id = id.trim();

        const user_id = formData.get("user_id") as string;
        if (user_id && user_id.trim().length > 0) query.user_id = user_id.trim();

        const car_id = formData.get("car_id") as string;
        if (car_id && car_id.trim().length > 0) query.car_id = car_id.trim();

        const start_date = formData.get("start_date") as string;
        if (start_date && start_date.trim().length > 0) query.start_date = new Date(start_date.trim());

        const end_date = formData.get("end_date") as string;
        if (end_date && end_date.trim().length > 0) query.end_date = new Date(end_date.trim());

        props.onSearch(query);
    };

    return (
        <div>
            <div className="flex justify-center">
                <form onSubmit={handleSearch}>
                    <div className="flex flex-wrap justify-center gap-2">
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="id" className="px-1 py-0.5">Reservation ID</label>
                            <input name="id" type="text" className="px-1 bg-gray-50 w-28" />
                        </div>
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="user_id" className="px-1 py-0.5">Driver License</label>
                            <input name="user_id" type="text" className="px-1 bg-gray-50 w-28" />
                        </div>
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="car_id" className="px-1 py-0.5">License Plate</label>
                            <input name="car_id" type="text" className="px-1 bg-gray-50 w-28" />
                        </div>
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="start_date" className="px-1 py-0.5">Start Date</label>
                            <input name="start_date" type="date" className="px-1 bg-gray-50 w-32" />
                        </div>
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="end_date" className="px-1 py-0.5">End Date</label>
                            <input name="end_date" type="date" className="px-1 bg-gray-50 w-32" />
                        </div>
                    </div>
                    <div className="flex justify-center my-4 gap-4">
                        <button type="submit" className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition ease-in-out duration-150">
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <div className="">
                <div className="bg-gray-200 grid grid-cols-6 font-semibold">
                    <div className="border border-gray-600 px-2 py-1">
                        Reservation ID
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Driver license
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        License plate
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Start date
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        End date
                    </div>
                    <div className="border border-gray-600 px-2 py-1"></div>
                </div>
                {props.reservations.map((reservation, idx) => (
                    <div key={reservation.id} className={`grid grid-cols-6 text-sm ${idx % 2 ? "bg-gray-100" : ""}`}>
                        <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                            {reservation.id}
                        </div>
                        <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                            {reservation.user_id}
                        </div>
                        <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                            {reservation.car_id}
                        </div>
                        <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                            {new Date(reservation.start_date).toLocaleDateString()}
                        </div>
                        <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                            {new Date(reservation.end_date).toLocaleDateString()}
                        </div>
                        <div className="border border-gray-600 px-2 py-1 flex justify-center gap-4">
                            <button className="px-2 bg-red-600 text-white rounded">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

type LocationsSearchQuery = {
    id?: string;
    city?: string;
}

type LocationsPageProps = {
    locations: CarLocation[];
    onSearch: (query: LocationsSearchQuery) => void;
};

const LocationsPage = (props: LocationsPageProps) => {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Build a query
        const query: LocationsSearchQuery = {};

        const id = formData.get("id") as string;
        if (id && id.trim().length > 0) query.id = id.trim();

        const city = formData.get("city") as string;
        if (city && city.trim().length > 0) query.city = city.trim();

        props.onSearch(query);
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
                {props.locations.map((location, idx) => (
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
};

export default function AdminDashboard() {
    type Page = "users" | "cars" | "reservations" | "locations";
    const [page, setPage] = useState<Page>("users");
    const [users, setUsers] = useState<User[]>([]);
    const [cars, setCars] = useState<Car[]>([]);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [locations, setLocations] = useState<CarLocation[]>([]);

    useEffect(() => {
        UserRepo.getUsers({}).then((res) => setUsers(res)).catch((err) => console.log(err));
        CarRepo.getCars({}).then((res) => setCars(res)).catch((err) => console.log(err));
        ReservationRepo.getReservations().then((res) => setReservations(res)).catch((err) => console.log(err));
        LocationRepo.getLocations().then((res) => setLocations(res)).catch((err) => console.log(err));
    }, []);

    const pageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const page = e.currentTarget.value as Page;
        setPage(page);
    };

    const handleUsersSearch = (query: UsersSearchQuery) => {
        UserRepo.getUsers(query).then((res) => setUsers(res)).catch((err) => console.log(err));
    };

    const handleCarsSearch = (query: CarsSearchQuery) => {
        CarRepo.getCars(query).then((res) => setCars(res)).catch((err) => console.log(err));
    };

    const handleReservationsSearch = (query: ReservationsSearchQuery) => {
        ReservationRepo.getReservations(query).then((res) => setReservations(res)).catch((err) => console.log(err));
    };

    const handleLocationsSearch = (query: LocationsSearchQuery) => {
        LocationRepo.getLocations(query).then((res) => setLocations(res)).catch((err) => console.log(err));
    };

    return (
        <main className="flex justify-center">
            <div className="w-3/4">
                <nav className="flex justify-between border-b-2 border-gray-400 gap-2 px-4 font-bold">
                    <button 
                        className={
                            `${page == "users" ? "bg-blue-500 text-white" : "text-blue-500"} 
                            py-2 border-l border-r border-t border-blue-500 rounded-t-lg grow`
                        } 
                        value={"users"} 
                        onClick={pageHandler}>
                        Users
                    </button>
                    <button 
                        className={
                            `${page == "cars" ? "bg-red-500 text-white" : "text-red-500"}
                            py-2 border-l border-r border-t border-red-500 rounded-t-lg grow`
                        }
                        value={"cars"} 
                        onClick={pageHandler}>
                        Cars
                    </button>
                    <button 
                        className={
                            `${page == "reservations" ? "bg-green-500 text-white" : "text-green-500"}
                            py-2 border-l border-r border-t border-green-500 rounded-t-lg grow`
                        }
                        value={"reservations"}
                        onClick={pageHandler}>
                        Reservations
                    </button>
                    <button 
                        className={
                            `${page == "locations" ? "bg-yellow-500 text-white" : "text-yellow-500"}
                            py-2 border-l border-r border-t border-yellow-500 rounded-t-lg grow`
                        }
                        value={"locations"}
                        onClick={pageHandler}>
                        Locations
                    </button>
                </nav>
                <div className="mt-4">
                    {page === "users" && (
                        <UsersPage users={users} onSearch={handleUsersSearch} />
                    )}
                    {page === "cars" && (
                        <CarsPage cars={cars} onSearch={handleCarsSearch} />
                    )}
                    {page === "reservations" && (
                        <ReservationsPage reservations={reservations} onSearch={handleReservationsSearch} />
                    )}
                    {page === "locations" && (
                        <LocationsPage locations={locations} onSearch={handleLocationsSearch} />
                    )}
                </div>
            </div>
        </main>
    );
}