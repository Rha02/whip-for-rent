"use client";
import { Car, CarWithLocation } from "@/lib/types";
import { CarRepo } from "@/repository";
import { useEffect, useState } from "react";
import Image from "next/image";
import DatePicker from "tailwind-datepicker-react";
import { IOptions } from "tailwind-datepicker-react/types/Options";

export default function ReserveCar({ params }: { params: { id: string } }) {
    const [car, setCar] = useState<CarWithLocation | null>(null);
    const [show1, setShow1] = useState<boolean>(false);
    const [show2, setShow2] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const options: IOptions = {
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        clearBtnText: "Clear",
        maxDate: new Date("2030-01-01"),
        minDate: new Date("1950-01-01"),
        datepickerClassNames: "top-12",
        defaultDate: new Date(),
        language: "en",
        disabledDates: [],
        inputNameProp: "date",
        inputIdProp: "date",
        inputPlaceholderProp: "Select Date",
        inputDateFormatProp: {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    };

    // Fetch cars from the backend
    useEffect(() => {
        CarRepo.getCar(params.id).then(res => setCar(res));
    }, [params.id]);

    const reserveHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleChange = (newDate: Date) => {
        console.log(newDate);
    };

    return (
        <main className="text-center text-gray-800">
            <h1 className="text-4xl font-semibold">Reserve a Car</h1>
            {car === null ? <p>Loading...</p> :
                <div className="flex justify-center">
                    <div className="w-3/4">
                        <div className="flex justify-center gap-8 items-center">
                            <div className="">
                                <Image src={car.image_url}
                                    alt="Car Image"
                                    width={400}
                                    height={400}
                                    className="rounded-lg" />
                            </div>
                            <div className="text-left">
                                <h2 className="text-2xl font-bold text-teal-700">{car.make} {car.model}</h2>
                                <h3 className="text-xl text-teal-700 font-semibold">{car.year}</h3>
                                <h6 className="text-lg">
                                    <span className="font-semibold text-teal-700">
                                        ${car.price}
                                    </span> / day
                                </h6>
                                <h6 className="text-lg">{car.color}</h6>
                                <h6 className="text-lg">{car.location}</h6>
                            </div>
                        </div>
                        <form onSubmit={reserveHandler} className="mt-4 text-xl">
                            <h3 className="font-semibold mb-2">Reserve</h3>
                            <div className="flex items-center gap-2 justify-center">
                                <span className="text-teal-800 font-semibold px-1">
                                    From
                                </span>
                                <DatePicker classNames="w-96" options={options} onChange={handleChange} show={show1} setShow={() => setShow1(!show1)} />
                                <span className="text-teal-800 font-semibold px-1">
                                    To
                                </span>
                                <DatePicker classNames="w-96" options={options} onChange={handleChange} show={show2} setShow={() => setShow2(!show2)} />
                            </div>
                            <button className="mt-4 text-lg rounded-lg px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 transition ease-in-out" type="submit">
                                Reserve
                            </button>
                        </form>
                    </div>
                </div>
            }
        </main>
    );
}