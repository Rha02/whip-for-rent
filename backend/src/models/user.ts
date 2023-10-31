interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
    access_level: number;
}

export default User;
