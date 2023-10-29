interface User {
    id: string;
    email: string;
    first_Name: string;
    last_Name: string;
    password: string;
    created_At?: Date;
    updated_At?: Date;
    access_level: number;
}

export default User;
