"use client";

import { useState } from "react";

export default function Login() {
    // error fields
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Get form data
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        // Send login request
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        // Handle response
        if (res.ok) {
            window.location.href = '/';
        } else {
            const data = await res.json();
            if (data.errors.email) setEmailError(data.errors.email);
            if (data.errors.password) setPasswordError(data.errors.password);
            if (data.message) alert(data.message);
        }
    };

    return (
        <main className="text-center text-gray-800 flex">
            <div className="h-screen w-full flex items-center justify-center">
                <div className="w-1/3 shadow-md flex justify-center">
                    <form className="mx-8 space-y-4 my-8 w-2/3" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-2">
                            <label className="text-gray-600 font-semibold" htmlFor="email">Email</label>
                            <input className="px-2 py-1 bg-gray-100 rounded" type="email" name="email" placeholder="email" required />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            <label className="text-gray-600 font-semibold" htmlFor="password">Password</label>
                            <input className="px-2 py-1 bg-gray-100 rounded" type="password" name="password" placeholder="password" required />
                        </div>
                        <div>
                            <button className="px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-600 transition ease-in-out duration-250" type="submit">
                                Login
                            </button>
                            <br />
                            <span>
                                Don&apos;t have an account? <a href="/register" className="text-blue-600 underline">
                                    Register</a>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}