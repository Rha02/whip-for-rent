import { HashRepository } from "./repository";

const NewTestHashRepo = (): HashRepository => {
    return {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        createHash: (value) => {
            return Promise.resolve("test_hash");
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        verifyHash(value, hash) {
            return Promise.resolve(true);
        },
    };
};

export default NewTestHashRepo;