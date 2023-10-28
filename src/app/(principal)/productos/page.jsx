"use client";
import Productos from "@/components/Productos";
import UseAlmacen from "@/hooks/UseAlmacen";
import Link from "next/link";
import { useEffect } from "react";
import {clienteAxios} from "@/config/clienteAxios"

const ProductosPage = () => {
    //* A pesar de que usamos las funciones del cliente en el context, "useContext" necesita "use client"
    const { productos, confirmarEliminarProducto, setProductos } = UseAlmacen(); //! Esto es del cliente
    
    //! El llamado de los datos en el mismo modulo es importante
    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
                const { data } = await clienteAxios('/productos', config)
                setProductos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProductos()
    })

    return (
        <>
        <h1 className="text-2xl text-white font-bold mt-4">Productos</h1>
            <Link
                href="/nuevoproducto"
                className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center"
            >
                Nuevo Producto
            </Link>
            <div className="overflow-x-scroll md:overflow-hidden md:mt-2 md:mb-8">
                <table className="table-auto shadow-md mt-10 w-full w-lg ">
                    <thead className="bg-blue-800">
                        <tr className="text-white">
                            <th className="w-[15%] py-2">Descripcion</th>
                            <th className="w-[25%] py-2">Imagen</th>
                            <th className="w-[15%] py-2">Precio</th>
                            <th className="w-[15%] py-2">Stock</th>
                            <th className="w-[15%] py-2">Editar</th>
                            <th className="w-[15%] py-2">Eliminar</th>
                        </tr>
                    </thead>

                    <tbody className="text-black font-medium text-center">
                        {productos && productos.length
                            ? productos.map((producto) => (
                                    <Productos
                                        key={producto.id}
                                        producto={producto}
                                        confirmarEliminarProducto={
                                            confirmarEliminarProducto
                                        }
                                    />
                                ))
                            : null}
                    </tbody>
                </table>
            </div>
        </>
    );
};
export default ProductosPage;
