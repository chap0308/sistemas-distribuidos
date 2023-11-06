import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
    // console.log(request.nextUrl.pathname);
    // console.log(await request.json());
    
    const jwt = request.cookies.get("myTokenName");
    // console.log("hola");
    
    if (!jwt) return NextResponse.redirect(new URL("/", request.url));

    try {
        //* Verificar que el token sea válido
        const { payload } = await jwtVerify(
            jwt.value,
            new TextEncoder().encode(process.env.JWT_SECRET)
        );
        // console.log(payload);
        
        if((request.nextUrl.pathname === "/usuarios" || request.nextUrl.pathname === "/nuevousuario") && payload.isAdmin===false){
            console.log(payload.isAdmin);
            return NextResponse.redirect(new URL("/menu", request.url));
        }
        // console.log(payload);
        return NextResponse.next();
    } catch (error) {
        //! Si no es valido
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: ["/menu", "/clientes", "/nuevocliente", "/nuevoproducto", "/productos", "/usuarios", "/nuevousuario", "/pedidos", "/nuevopedido"],
};
