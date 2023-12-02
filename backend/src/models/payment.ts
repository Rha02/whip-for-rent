interface Payment {
    reservation_id: number;
    amount: number;
    due_date: Date;
    status: "unpaid" | "pending" | "paid" | "overdue";
}

export default Payment;