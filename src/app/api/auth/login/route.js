import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { email, contraseña, isAdmin } = await request.json();
    
    if (email && contraseña) {
        // expire in 1 day
        const token = sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                email,
                isAdmin
            },
            process.env.JWT_SECRET
        );

        const response = NextResponse.json({
            token,
        });

        response.cookies.set({
            name: "myTokenName",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24,
            path: "/",
        });
        request.cookies.set('tokenNext', token)

        return response;
    }
}
