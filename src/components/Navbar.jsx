import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="flex justify-center md:justify-start md:max-w-5xl md:mx-auto">
            <Link href="/menu">
                <Image
                    src="https://cdn.icon-icons.com/icons2/3284/PNG/512/check_menu_checklist_list_clipboard_icon_208206.png"
                    alt="logo"
                    width={100}
                    height={100}
                    className="w-auto"
                    priority={true}
                />
            </Link>
        </nav>
    );
};
export default Navbar;
