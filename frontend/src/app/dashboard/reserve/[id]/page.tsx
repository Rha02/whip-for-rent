"use client";
import { CarWithLocation } from "@/lib/types";
import { CarRepo, ReservationRepo } from "@/repository";
import { useEffect, useState } from "react";
import Image from "next/image";
import DatePicker from "tailwind-datepicker-react";
import { IOptions } from "tailwind-datepicker-react/types/Options";
import Link from "next/link";

type SuccessModalProps = {
    setShow: (show: boolean) => void;
};

const SuccessModal = ({ setShow }: SuccessModalProps) => {
    return (
        <div className="z-10 fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 text-green-800">
                <h1 className="text-2xl font-semibold">Success!</h1>
                <p className="text-lg">Your reservation has been made.</p>
                <div className="mt-4 text-white text-lg flex justify-center gap-4">
                    <Link href="/dashboard/pay/123" className="rounded-lg px-3 py-2 text-white bg-green-500 hover:bg-green-600 transition ease-in-out">
                        Pay Now!
                    </Link>
                    <button className="px-3 py-2 text-gray-600" onClick={() => setShow(false)}>
                        Pay Later
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function ReserveCar({ params }: { params: { id: string } }) {
    const [car, setCar] = useState<CarWithLocation | null>(null);
    const [reservations, setReservations] = useState<any[]>([]);
    const [showStart, setShowStart] = useState<boolean>(false);
    const [showEnd, setShowEnd] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

    const options: IOptions = {
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        clearBtnText: "Clear",
        maxDate: new Date("2030-01-01"),
        minDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
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
        ReservationRepo.getCarReservations(params.id).then(res => console.log(res));
    }, [params.id]);

    const reserveHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const btn = e.currentTarget.querySelector("button") as HTMLButtonElement;

        setShowSuccessModal(true);

        return;
        // disable button
        btn.setAttribute("disabled", "true");
        // Add style to button
        btn.classList.add("opacity-75", "bg-blue-600");
        btn.classList.remove("hover:bg-blue-600");

        // send request
        ReservationRepo.addReservation({
            car_id: params.id,
            start_date: startDate,
            end_date: endDate
        }).then(res => {
            console.log(res);
            // enable button
            btn.removeAttribute("disabled");
            // remove style from button
            btn.classList.remove("opacity-75", "bg-blue-600");
            btn.classList.add("hover:bg-blue-600");
        });
    };

    const handleStartChange = (newDate: Date) => {
        setStartDate(newDate);
    };

    const handleEndChange = (newDate: Date) => {
        setEndDate(newDate);
    };

    return (
        <main className="text-center text-gray-800">
            {showSuccessModal && <SuccessModal setShow={setShowSuccessModal} />}
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
                                <h6>License Plate: {car.id}</h6>
                            </div>
                        </div>
                        <form onSubmit={reserveHandler} className="mt-4 text-xl">
                            <h3 className="font-semibold mb-2">Reserve</h3>
                            <div className="flex items-center gap-2 justify-center">
                                <span className="text-teal-800 font-semibold px-1">
                                    From
                                </span>
                                <DatePicker classNames="w-96" options={options} onChange={handleStartChange} show={showStart} setShow={() => setShowStart(!showStart)} />
                                <span className="text-teal-800 font-semibold px-1">
                                    To
                                </span>
                                <DatePicker classNames="w-96" options={options} onChange={handleEndChange} show={showEnd} setShow={() => setShowEnd(!showEnd)} />
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