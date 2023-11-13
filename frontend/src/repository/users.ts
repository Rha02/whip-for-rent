import { User } from "@/lib/types";

interface UserGetFilter {
    fname?: string;
    lname?: string;
    email?: string;
    license?: string;
}

interface UserRepository {
    /**
     * getUsers() gets a list of all users
     */
    getUsers(filter: UserGetFilter): Promise<User[]>;

    /**
     * deleteUser() deletes a user by id
     * @param id The id of the user to get
     */
    deleteUser(id: string): Promise<boolean>;

    /**
     * updateUser() updates a user by id
     * @param id The id of the user to update
     * @param user The user object to update
     */
    updateUser(id: string, user: User): Promise<User>;
}

const NewUserRepository = (host: string): UserRepository => {
    const getUsers = async (filter: UserGetFilter): Promise<User[]> => {
        try {
            const url = new URL(`${host}/users`);
            if (filter.fname) url.searchParams.append("fname", filter.fname);
            if (filter.lname) url.searchParams.append("lname", filter.lname);
            if (filter.email) url.searchParams.append("email", filter.email);
            if (filter.license) url.searchParams.append("license", filter.license);
            const response = await fetch(url.toString());
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const deleteUser = async (id: string): Promise<boolean> => {
        try {
            const response = await fetch(`${host}/users/${id}`, {
                method: "DELETE",
            });
            return response.ok;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const updateUser = async (id: string, user: User): Promise<User> => {
        try {
            const response = await fetch(`${host}/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            return await response.json();
        } catch (error) {
            console.error(error);
            return user;
        }
    };

    return {
        getUsers,
        deleteUser,
        updateUser,
    };
};

export default NewUserRepository;