export default function PayPage({ params }: { params: { id: string } }) {
    return (
        <div>
            {params.id}
        </div>
    );
}