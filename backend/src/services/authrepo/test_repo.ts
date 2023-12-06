import { AuthTokenRepository, Payload } from "./repository";

const NewTestAuthRepo = (): AuthTokenRepository => {
    return {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        createToken: (payload) => {
            return "test_token";
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        parseToken: (token) => {
            const res: Payload = {
                email: "test_email",
                firstName: "test_username",
                accessLevel: 3
            };

            return res;
        }
    };
};

export default NewTestAuthRepo;