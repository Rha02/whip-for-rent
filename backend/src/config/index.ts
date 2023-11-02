import { DatabaseRepository } from "@/dbrepo";
import { AuthTokenRepository } from "@/services/authrepo";
import { FileStorageRepository } from "@/services/filestoragerepo";
import { HashRepository } from "@/services/hashrepo";

interface Config {
    db: DatabaseRepository;
    authTokenRepo: AuthTokenRepository;
    hashRepo: HashRepository;
    imageStorage: FileStorageRepository;
}

export default Config;