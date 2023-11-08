import NewCarRepository from "./cars";
import NewUserRepository from "./users";

const CarRepo = NewCarRepository("http://localhost:8080");
const UserRepo = NewUserRepository("http://localhost:8080");

export { CarRepo, UserRepo };