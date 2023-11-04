import Link from "next/link";

const Usuarios = ({usuario, confirmarEliminarUsuario}) => {
    const { nombre, apellido, email, admin, id } = usuario;

    return (
        <tr className="bg-slate-300">
            <td className="border border-gray-400 px-4 py-2">{nombre}</td>
            <td className="border border-gray-400 px-4 py-2">{apellido}</td>
            <td className="border border-gray-400 px-4 py-2">{email}</td>
            <td className="border border-gray-400 px-4 py-2">{admin ? "Administrador" : "Trabajador"}</td>
            <td className="border border-gray-400 px-4 py-2">
                <Link
                    href={`/usuarios/${id}`}
                    className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                >
                    Editar
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 ml-2"
                    >
                        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                </Link>
            </td>
            <td className="border border-gray-400 px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={() => confirmarEliminarUsuario(id)}
                >
                    Eliminar
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 ml-2"
                    >
                        <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </button>
            </td>
        </tr>
    );
}
export default Usuarios