"use client";
import Cliente from "@/components/Cliente";
import { clienteAxios } from "@/config/clienteAxios";
import { useEffect, useState } from "react";
import Link from "next/link";

//! Pudimos hacerlo de esta manera, pero para que haya una actualizacion inmediata cuando eliminemos, debemos usar "React"(useState y useEffect)
//* Se podría decir que esta es la manera del lado del servidor(no tiene "use client")
// const ClientesPage = async () => {
//     const obtenerClientes = async () => {
//         const url = "http://localhost:8080/api/clientes";
//         const { data } = await axios.get(url);
//         return data;
//     };

//     const clientes = await obtenerClientes();// No se usa useEffect para llamar la funcion
//* Esto es del lado del cliente
const ClientesPage = () => {
    
    const [clientes, setClientes] = useState([]);//*ESTO SI DEBERIA IR EN EL CONTEXT. PARA REALIZAR LAS OPERACIONES CON EL STATE EN EL MISMO CONNTEXT.
    //! IMPORTANTE: ASÍ ES COMO SE DEBE HACER PARA CADA MODULO "PROPIO"

    //! Y MÁS IMPORTANTE ES ESTE useEffect, ya que nos permite consultar los datos cada vez que entremos a la página.
    //! SI LO COLOCAMOS EN EL CONTEXT, NO SE PODRÍA OBTENER LOS DATOS DE MANERA INMEDIATA, POR ESO EN CADA "MODULO"(YA SEA PRODUCTOS, CLIENTES, PROVEEDORES, ETC.) DEBEMOS HACERLO DE LA SIGUIENTE MANERA:
    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const { data } = await clienteAxios.get("/clientes", config);
                setClientes(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerClientes();
    }, []);
    // console.log(clientes);
    //* ENTONCES CUANDO USAR CONTEXT?, PARA LAS FUNCIONES DE ELIMINAR O ACTUALIZAR CON EL FIN DE TENERLOS DE MANERA INMEDIATA.

    return (
        <>
            <h1 className="text-2xl text-white font-bold mt-14">Clientes</h1>
            <Link
                href="/nuevocliente"
                className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center"
            >
                Nuevo Cliente
            </Link>
            <div className="overflow-x-scroll md:overflow-hidden mb-14">
                <table className="table-auto shadow-md mt-10 w-full w-lg ">
                    <thead className="bg-blue-800">
                        <tr className="text-white ">
                            <th className="w-1/6 py-2">Nombre</th>
                            <th className="w-1/6 py-2">Apellido</th>
                            <th className="w-1/6 py-2">Email</th>
                            <th className="w-1/6 py-2">Telefono</th>
                            <th className="w-1/6 py-2">Editar</th>
                            <th className="w-1/6 py-2">Eliminar</th>
                        </tr>
                    </thead>

                    <tbody className="text-black font-medium text-center">
                        {clientes && clientes.length
                            ? clientes.map((cliente) => (
                                  <Cliente
                                      //! Para evitar esto, usamos el context
                                      key={cliente.id}
                                      cliente={cliente}
                                      setClientes={setClientes}
                                      clientes={clientes}
                                  />
                              ))
                            : null}
                    </tbody>
                </table>
            </div>
        </>
    );
};
export default ClientesPage;
