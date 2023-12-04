/* eslint-disable indent */
import { NextRequest, NextResponse } from "next/server";

interface RegisterBody {
    firstName: string;
    lastName: string;
    email: string;
    id : string;
    password: string;
}

export async function POST(req: NextRequest) {
    const body = await req.json() as RegisterBody;

    // Validate the request body
    if (!body.email || !body.password || !body.firstName || !body.lastName || !body.id) {
        return NextResponse.json({
            errors: {
                id : "ID is required",
                email: "Email is required",
                password: "Password is required",
                firstName: "First name is required",
                lastName: "Last name is required",
            }
        }, {
            status: 400
        });
    }

    console.log(body);

    // Make a request to the backend
    const host = process.env.SERVER_HOST;
    const res = await fetch(`${host}/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    // If the backend returns an error, return it to the frontend
    if (!res.ok) {
        return res.json().then((data) => {
            console.log(data);
            return NextResponse.json({
                errors: data.errors
            }, {
                status: res.status
            });
        }).catch((err) => {
            return NextResponse.json({}, {
                status: 500
            });
        });
    }
     // Get the cookie from the backend response
     const token = res.headers.get("Authorization");
     if (!token) {
         return NextResponse.json({
             message: "Something went wrong"
         }, {
             status: 500
         });
     }
 
     // Set the cookie in the response
     const response = NextResponse.json({});
     response.cookies.set("authtoken", token, {
         httpOnly: false,
         path: "/",
         expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days
     });
 
     return response;
 }