"use client";

import { Car, User } from "@/lib/types";
import { CarRepo, UserRepo } from "@/repository";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
    type Page = "users" | "cars" | "reservations" | "locations";
    const [page, setPage] = useState<Page>("users");
    const [users, setUsers] = useState<User[]>([]);
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        UserRepo.getUsers().then((res) => setUsers(res)).catch((err) => console.log(err));
        CarRepo.getCars().then((res) => setCars(res)).catch((err) => console.log(err));
    }, []);

    const pageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const page = e.currentTarget.value as Page;
        setPage(page);
    };

    return (
        <main className="flex justify-center">
            <div className="w-3/4">
                <nav className="flex justify-between border-b-2 border-gray-400 gap-2 px-4">
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
                        <div className="grid grid-rows-1 justify-center">
                            <div>
                                <form>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                                            <label htmlFor="license" className="px-1 py-0.5">Driver License</label>
                                            <input name="license" type="text" className="px-1 bg-gray-50 w-28" />
                                        </div>
                                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                                            <label htmlFor="last_name" className="px-1 py-0.5">Email</label>
                                            <input name="last_name" type="email" className="px-1 bg-gray-50 w-28" />
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
                                    <button type="submit">Search</button>
                                </form>
                            </div>
                            <div>
                                List of users goes here
                            </div>
                        </div>
                    )}
                    {page === "cars" && cars.map((car) => (
                        <div key={car.id}>
                            
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}