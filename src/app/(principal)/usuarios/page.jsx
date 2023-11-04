"use client";
import Usuarios from "@/components/Usuarios";
import { useEffect } from "react";
import UseAlmacen from "@/hooks/UseAlmacen";
import { clienteAxios } from "@/config/clienteAxios";

const UsuariosPage = () => {
    const { usuarios, confirmarEliminarUsuario, setUsuarios } = UseAlmacen(); //! Esto es del cliente
    useEffect(() => {
        const obtenerUsuarios = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const { data } = await clienteAxios.get("/usuarios", config);
                setUsuarios(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerUsuarios();
    }, [setUsuarios]);

    // console.log(usuarios);
    return (
        <>
            <h1 className="text-2xl text-white font-bold mt-14">Usuarios</h1>
            
            <div className="overflow-x-scroll md:overflow-hidden">
                <table className="table-auto shadow-md mt-10 w-full w-lg ">
                    <thead className="bg-blue-800">
                        <tr className="text-white ">
                            <th className="w-1/6 py-2">Nombre</th>
                            <th className="w-1/6 py-2">Apellido</th>
                            <th className="w-1/6 py-2">Email</th>
                            <th className="w-1/6 py-2">Rol</th>
                            <th className="w-1/6 py-2">Editar</th>
                            <th className="w-1/6 py-2">Eliminar</th>
                        </tr>
                    </thead>

                    <tbody className="text-black font-medium text-center">
                        {usuarios && usuarios.length
                            ? usuarios.map((usuario) => (
                                <Usuarios
                                    //! Para evitar esto, usamos el context
                                    key={usuario.id}
                                    usuario={usuario}
                                    confirmarEliminarUsuario={
                                        confirmarEliminarUsuario
                                    }
                                />
                            ))
                            : null}
                    </tbody>
                </table>
                {usuarios && usuarios.length === 0 ? (
                    <h1 className="flex justify-center mt-12 font-bold text-2xl">
                        No hay usuarios
                    </h1>
                ) : null}
            </div>
        </>
    );
};
export default UsuariosPage;
