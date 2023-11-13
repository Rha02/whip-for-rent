import NewCarRepository from "./cars";
import NewLocationRepository from "./locations";
import NewReservationRepository from "./reservations";
import NewUserRepository from "./users";

const CarRepo = NewCarRepository("http://localhost:8080");
const UserRepo = NewUserRepository("http://localhost:8080");
const ReservationRepo = NewReservationRepository("http://localhost:8080");
const LocationRepo = NewLocationRepository("http://localhost:8080");

export { CarRepo, UserRepo, ReservationRepo, LocationRepo };