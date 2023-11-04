interface Car {
    id: string;
    make: string;
    model: string;
    year: number;
    color: string;
    price: number;
    image_name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default Car;
