interface Reservation {
    id?: number,
    user_id: number,
    car_id: string,
    start_date: Date,
    end_date: Date
}

export default Reservation;