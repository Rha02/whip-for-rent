interface Car {
    id: string;
    make: string;
    model: string;
    year: number;
    color: string;
    price: number;
    image_name: string;
    location_id: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export default Car;
