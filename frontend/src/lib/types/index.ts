export type Car = {
    id: string,
    make: string,
    model: string,
    year: number,
    price: number,
    color: string,
    location_id: string,
    image_url: string,
    createdAt?: Date;
    updatedAt?: Date;
};

export type User = {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    created_at?: Date;
    updated_at?: Date;
    access_level: number;
}

export type Reservation = {
    id: string;
    user_id: string;
    car_id: string;
    start_date: Date;
    end_date: Date;
};

export type CarLocation = {
    id?: string;
    city: string;
};