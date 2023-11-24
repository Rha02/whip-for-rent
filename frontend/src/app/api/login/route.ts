import { NextRequest, NextResponse } from "next/server";

interface LoginBody {
    email: string;
    password: string;
}

export async function POST(req: NextRequest) {
    const body = await req.json() as LoginBody;

    // Validate the request body
    if (!body.email || !body.password) {
        return NextResponse.json({
            errors: {
                email: "Email is required",
                password: "Password is required"
            }
        }, {
            status: 400
        });
    }

    // Make a request to the backend
    const host = process.env.SERVER_HOST;
    const res = await fetch(`${host}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    // If the backend returns an error, return it to the frontend
    if (!res.ok) {
        console.error(res.status);
        return res.json().then((data) => {
            return NextResponse.json({
                errors: "TODO: Get errors from backend"
            }, {
                status: res.status
            });
        }).catch((err) => {
            console.error(err);
            return NextResponse.json({
                message: "Something went wrong"
            }, {
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