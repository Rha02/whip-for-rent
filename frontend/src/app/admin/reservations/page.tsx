"use client";
import { Reservation } from "@/lib/types";
import { ReservationRepo } from "@/repository";
import { useEffect, useState } from "react";

export default function ReservationsPanel() {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    useEffect(() => {
        ReservationRepo.getReservations({}).then((res) => setReservations(res)).catch((err) => console.log(err));
    }, []);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Build a query
        const query = {} as any;

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

        ReservationRepo.getReservations(query).then((res) => setReservations(res)).catch((err) => console.log(err));
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
                {reservations.map((reservation, idx) => (
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
}