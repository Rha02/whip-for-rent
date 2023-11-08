export type Car = {
    id: string,
    make: string,
    model: string,
    year: number,
    price: number,
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