/* eslint-disable indent */
"use client";

import { useState } from "react";
export default function Register() {
   
        // error fields
        const [emailError, setEmailError] = useState<string | null>(null);
   
        const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
    
            // Get form data
            const formData = new FormData(event.currentTarget);
            const firstName = formData.get('firstName') as string;
            const lastName = formData.get('lastName') as string;
            const email = formData.get('email') as string;
            const id = formData.get('id') as unknown as number;
            const password = formData.get('password') as string;
            console.log(firstName);
            console.log(lastName);
            console.log(email);
            console.log(id);
            console.log(password);
    
            // Send register request
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, email, firstName, lastName, password }),
            });
    
            // Handle response
            if (res.ok) {
                window.location.href = '/login';
             } 
            // else {
            //     const data = await res.json();
            //     if (data.errors.email) setEmailError(data.errors.email);
            //     if (data.errors.password) setPasswordError(data.errors.password);
            //     if (data.message) alert(data.message);
            // }
        };
    
    return (
       
        <div className="flex justify-center w-screen h-screen bg-blue-400">
            <div className="max-w-d border-2 rounded 2x1 my-20 bg-white opacity-90">
                <div className="flex justify-center my-4">
                    <h6 className="text-2x1 text-zinc-600 font-bold py-4">REGISTER</h6>
                </div>
                <div className="flex-col justify-center my-4">
                    
                    <form onSubmit={handleSubmit} >
                    
                    <div className="mb2  px-4 py-4">
                        <label htmlFor="text-zinc-600 font-bold"> First Name <span className="text-red-600">*</span></label>
                        <input type="text" name="firstName" className="border-2 rounded-lg w-full px-2 py-2" placeholder="Joe" required autoFocus/>
                    </div>
                    
                    <div className="mb2  px-4 py-4">
                        <label htmlFor="text-zinc-600 font-bold"> Last Name <span className="text-red-600">*</span></label>
                        <input type="text" name="lastName" className="border-2 rounded-lg w-full px-2 py-2" placeholder="Biden" required autoFocus/>
                    </div>
                    
                    <div className="mb2  px-4 py-4">
                        <label htmlFor="text-zinc-600 font-bold">Email <span className="text-red-600">*</span></label>
                        <input type="email" name="email" className="border-2 rounded-lg w-full px-2 py-2" placeholder="joe@biden.com" required/>
                    </div>
                    
                    <div className="mb2  px-4 py-4">
                        <label htmlFor="text-zinc-600 font-bold">Driver License ID <span className="text-red-600">*</span></label>
                        <input type="text" name="id" className="border-2 rounded-lg w-full px-2 py-2" placeholder="A47D88V" required />
                    </div>
                    
                    <div className="mb2 px-4 py-4">
                        <label htmlFor="text-zinc-600 font-bold">Password <span className="text-red-600">*</span></label>
                        <input type="password" name="password" className="border-2 rounded-lg w-full px-2 py-2" placeholder="*********" required/>
                    </div>
                    
                    <div className="mb2 px-4 py-4">
                        <label htmlFor="text-zinc-600 font-bold">Confirm Password <span className="text-red-600">*</span></label>
                        <input type="password" className="border-2 rounded-lg w-full px-2 py-2" placeholder="**********" required />
                    </div>
                    
                    <div className="mb2 flex justify-center py-4">
                        <button name="intent" value="register" className="border-2 rounded-lg px-8 py-4 bg-blue-400 text-white font-bold hover:bg-blue-800" type="submit">
                            Submit
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}