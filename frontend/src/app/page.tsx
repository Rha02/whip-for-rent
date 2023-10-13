export default function Home() {
    return (
        <main className="text-center text-gray-800">
            <h1 className="text-5xl font-bold">WhipForRent</h1>
            <h6 className="text-xl">
                One Stop Car Rental Shop for all your car rental needs
            </h6>
            <div className="flex gap-4 justify-center mt-2">
                <a className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ease-in-out duration-250" href="/register">
                    Register
                </a>
                <a className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ease-in-out duration-250" href="/login">
                    Login
                </a>
            </div>
        </main>
    );
}
