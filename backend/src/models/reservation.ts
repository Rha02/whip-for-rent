interface Reservation {
    id?: number,
    user_id: string,
    car_id: string,
    start_date: Date,
    end_date: Date
}

export default Reservation;