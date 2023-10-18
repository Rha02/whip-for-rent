interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    access_level: number;
}

export default User;
