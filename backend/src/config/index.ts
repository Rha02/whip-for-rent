import { DatabaseRepository } from "@/dbrepo";
import { AuthTokenRepository } from "@/services/authrepo";

interface Config {
    db: DatabaseRepository;
    authTokenRepo: AuthTokenRepository;
}

export default Config;