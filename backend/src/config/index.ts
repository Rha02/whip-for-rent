import { DatabaseRepository } from "@/dbrepo";
import { AuthTokenRepository } from "@/services/authrepo";
import { HashRepository } from "@/services/hashrepo";

interface Config {
    db: DatabaseRepository;
    authTokenRepo: AuthTokenRepository;
    hashRepo: HashRepository;
}

export default Config;