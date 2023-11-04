import Image from "next/image";
import Link from "next/link";

const Menu = ({seccion}) => {
    return (
        <div
            className="relative flex flex-col text-gray-700 bg-slate-200 shadow-md w-72 rounded-xl bg-clip-border"
        >
            <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg rounded-xl bg-blue-500 bg-clip-border shadow-gray-500/40">
                <Image
                    className=" mx-auto w-48" //!para el width toma en cuenta el tamaño de las imagenes, es importante
                    src={seccion.img}
                    alt="card-image"
                    width={200}
                    height={150}
                    priority={true}
                />
            </div>
            <div className="p-6">
                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 text-center">
                    {seccion.titulo}
                </h5>
            </div>
            <div className="p-6 pt-0">
                <Link
                    href={seccion.url}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {seccion.boton}
                </Link>
            </div>
        </div>
    );
};
export default Menu;
