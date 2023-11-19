import Image from "next/image";
import { Car } from "../../types";

type CarCardProps = {
    car: Car;
}

export default function CarCard(props: CarCardProps) {
    return (
        <div className="shadow p-4">
            <div className="flex justify-center bg-gray-200 rounded">
                <Image src="" 
                    alt="Car Image" 
                    width={400} 
                    height={400} 
                    className="rounded-lg w-full" />
            </div>
            <div className="">
                <h2 className="text-lg font-semibold">{props.car.make} {props.car.model} {props.car.year}</h2>
                <div className="flex justify-center gap-2">
                    <p className="text-sm">${props.car.price}</p>
                    <p className="text-sm">{props.car.color}</p>
                </div>
                <button className="bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600 mt-2">
                    View
                </button>
            </div> 
        </div>
    );
}