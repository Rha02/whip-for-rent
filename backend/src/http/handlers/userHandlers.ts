import DatabaseRepository from '@dbrepo/repository';

interface UserRepository {
    db: DatabaseRepository;
    getUser: (id: string) => Promise<unknown>;
}

const NewUserRepository = (db: DatabaseRepository): UserRepository => {
    return {
        db,
        getUser: async (id: string) => {
            const user = await db.getUserByID(id);
            return user;
        }
    };
};

export { UserRepository, NewUserRepository };
