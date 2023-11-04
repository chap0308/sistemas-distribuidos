"use client";
import Image from "next/image";
import Link from "next/link";
import { authAxiosFromNext } from "@/config/clienteAxios";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();

    const logout = async () => {
        try {
            const res = await authAxiosFromNext.get("/logout");
            // console.log(res);
        } catch (error) {
            console.error(error.message);
        }
        router.push("/");
    };

    return (
        <nav className="flex justify-around md:justify-between md:max-w-5xl md:mx-auto">
            <Link href="/menu">
                <Image
                    src="/img/menu-logo.webp"
                    alt="logo"
                    width={100}
                    height={100}
                    className="w-auto"
                    priority={true}
                />
            </Link>
            <button onClick={() => logout()}>
                <Image
                    src="/img/exit-logout.webp"
                    alt="exit-logout"
                    width={60}
                    height={60}
                    className="w-auto"
                    priority={true}
                />
            </button>
        </nav>
    );
};
export default Navbar;
