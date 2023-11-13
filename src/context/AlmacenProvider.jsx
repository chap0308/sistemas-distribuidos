"use client";
import { createContext, useState, useEffect, useReducer } from "react";
// import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {authAxios, clienteAxios, uploadAxiosFromNext} from '@/config/clienteAxios'
import AlmacenReducer from './AlmacenReducer';

import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS,
    ACTUALIZAR_TOTAL
} from '@/types'

const MySwal = withReactContent(Swal)

export const AlmacenContext = createContext();

const AlmacenProvider = ({ children }) => {

    const [paginaLista, setPaginaLista] = useState(false);
    const [productosData, setProductosData] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [pedidos, setPedidos] = useState([]);

    // State de Pedidos
    const initialState = {
        cliente: {},
        productos: [],
        total: 0
    }
    const [ state, dispatch ] = useReducer(AlmacenReducer, initialState);
    
    // const router = useRouter()

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
        //*
        //! MANERA INCORRECTA DE HACER UNA VALIDACION DE AUTENTICACION:
        // const token = localStorage.getItem('token');
        // console.log(token);
        // console.log(typeof token);
        // if(!token){
        //     router.push('/')
        // }
        // const validarAuth = async () => {
        //     try {
        //         // const config = {
        //         //     headers: {
        //         //         "Content-Type": "application/json",
        //         //     }
        //         // }
        //         const { data } = await authAxios(`/user/${token}`)
        //         console.log(data);
        //         if(!data){
        //             router.push('/')
        //         }
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        // validarAuth()
        // const cookies = Cookies.get();
        // console.log(cookies);
    }, []);

    const confirmarEliminarUsuario = (id) => {
        MySwal.fire({
            title: "¿Deseas eliminar a este usuario?",
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
                    await clienteAxios.delete(`/usuarios/${id}`, config);
                    
                    //Actualizar en el State
                    const usuariosActualizados = usuarios.filter(usuariosState => usuariosState.id !== id);
                    setUsuarios(usuariosActualizados)
                    MySwal.fire("Eliminado correctamente!", "success");
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }

    //! SOLO USAR PARA CREAR LAS FUNCIONES DE LOS DIFERENTES MODULOS COMO CLIENTES, PRODUCTOS, ETC.
    const confirmarEliminarProducto = (id, imagen) => {
        MySwal.fire({
            title: "¿Deseas eliminar este producto?",
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
                    await uploadAxiosFromNext.delete(`/upload/${imagen}`);
                    // Eliminar por ID
                    await clienteAxios.delete(`/productos/${id}`,config);
                    
                    //Actualizar en el State
                    const productosActualizados = productosData.filter(productoState => productoState.id !== id);
                    setProductosData(productosActualizados)
                    MySwal.fire("Eliminado correctamente!", "success");
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }

    //*Pedidos funciones:

    // Modifica el Cliente
    const agregarCliente = cliente => {
        // console.log(cliente);
        
        dispatch({
            type: SELECCIONAR_CLIENTE, //! esto definira el case del switch
            payload: cliente //! acá se le envia los datos del state de cada componente
        })
    }

    // Modifica los productos
    const agregarProducto = productosSeleccionados => {
        
        let nuevoState;
        if(state.productos.length > 0 ) {
            
            nuevoState = productosSeleccionados.map( producto => {
                const nuevoObjeto = state.productos.find( productoState => productoState.id === producto.id  );
                return {...producto, ...nuevoObjeto }
            } )
        } else {
            nuevoState = productosSeleccionados;
        }

        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: nuevoState
        })
    }

    // Modifica las cantidades de los productos
    const cantidadProductos = nuevoProducto => {
        dispatch({
            type: CANTIDAD_PRODUCTOS,
            payload: nuevoProducto
        })
    }

    const actualizarTotal = () => {
        dispatch({
            type: ACTUALIZAR_TOTAL
        })
    }

    return (
        <>
            {
                paginaLista ? (
                    <AlmacenContext.Provider
                        value={{
                            productosData,
                            confirmarEliminarProducto,
                            setProductosData,
                            usuarios,
                            setUsuarios,
                            confirmarEliminarUsuario,
                            pedidos,
                            setPedidos,
                            cliente: state.cliente,
                            productos: state.productos,
                            total: state.total,
                            agregarCliente,
                            agregarProducto,
                            cantidadProductos,
                            actualizarTotal,
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