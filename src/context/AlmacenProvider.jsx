"use client";
import { createContext, useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import {clienteAxios} from "@/config/clienteAxios"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const AlmacenContext = createContext();

const AlmacenProvider = ({ children }) => {

    const [paginaLista, setPaginaLista] = useState(false);
    const [productos, setProductos] = useState([]);

    const router = useRouter()

    useEffect(() => {
        setPaginaLista(true); //! Hidratation
        //! NO COMETER EL ERROR DE TRAER LOS DATOS DE UN PROPIO MODULO ACÁ
        //* ESTO PODRIAMOS HACER PARA DATOS QUE APARECEN EN GENERAL(COMO LAS DEL NAVBAR)
        // const obtenerProductos = async () => {
        //     try {
        //         const config = {
        //             headers: {
        //                 "Content-Type": "application/json",
        //             }
        //         }
        //         const { data } = await clienteAxios('/productos', config)
        //         setProductos(data)
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        // obtenerProductos()
    }, []);
    //! SOLO USAR PARA CREAR LAS FUNCIONES DE LOS DIFERENTES MODULOS COMO CLIENTES, PRODUCTOS, ETC.
    const confirmarEliminarProducto = id => {
        MySwal.fire({
            title: "¿Deseas eliminar a este cliente?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: "No, Cancelar",
        }).then(async(result) => {
            if (result.value) {
                try {
                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                    // Eliminar por ID
                    await clienteAxios.delete(`/productos/${id}`,config);
                    
                    //Actualizar en el State
                    const productosActualizados = productos.filter(productoState => productoState.id !== id);
                    setProductos(productosActualizados)
                    MySwal.fire("Eliminado correctamente!", "success");
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }


    return (
        <>
            {
                paginaLista ? (
                    <AlmacenContext.Provider
                        value={{
                            productos,
                            confirmarEliminarProducto,
                            setProductos
                        }}
                    >
                        {children}
                    </AlmacenContext.Provider>
                ) : null
            }
        </>
    )
}
export default AlmacenProvider