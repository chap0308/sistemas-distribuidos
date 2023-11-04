import { secciones } from "@/utils/menu";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import Menu from "@/components/Menu";

const MenuPage = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get("myTokenName");
    const jwt = token?.value;
    const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return (
        <>
            <div className={`flex flex-col items-center gap-12 my-12 md:grid md:grid-cols-3 ${payload.isAdmin ? "md:h-[80vh]" : "md: h-[60vh]"}  md:mt-20 md:gap-12`}>
                { payload.isAdmin ? secciones?.map((seccion) =>
                (
                    <Menu key={seccion.titulo} seccion={seccion} />
                )): secciones.filter(seccion => seccion.url !== "/usuarios").map((seccion) => (
                    <Menu key={seccion.titulo} seccion={seccion} />
                ))}
            </div>
        </>
    );
};
export default MenuPage;
