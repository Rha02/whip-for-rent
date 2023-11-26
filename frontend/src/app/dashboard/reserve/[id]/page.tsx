export default function ReserveCar({ params }: { params: { id: string } }) {
    return (
        <main>
            <h1>Reserve Car</h1>
            <p>Car ID: {params.id}</p>
        </main>
    );
}