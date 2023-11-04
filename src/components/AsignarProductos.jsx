"use client"
import UseAlmacen from '@/hooks/UseAlmacen';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import {clienteAxios} from '@/config/clienteAxios';

const AsignarProductos = () => {

    // state local del componente
    const [ productos, setProductos ] = useState([]);
    const [ allProductos, setAllProductos ] = useState([]);

    const { agregarProducto, actualizarTotal } = UseAlmacen()

    useEffect(()=>{
        const obtenerProductos = async () => {
            try {
                const { data } = await clienteAxios.get('/productos')
                setAllProductos(data);
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProductos()
    },[])

    useEffect(() => {
        console.log(productos);//! importante
        // TODO: Función para pasar a PedidoState.js
        //! condicionamos el useEffect para asegurarnos de que no venga como null el state de productos, y tambien, actualizamos el total
        if(productos == null) {
            setProductos([]);
            actualizarTotal();
        }else{
            agregarProducto(productos);
            actualizarTotal();
        }
    }, [productos])

    //* funcion para colocar en el state productos
    const seleccionarProducto = producto => {
        setProductos(producto)
    }

    return ( 
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">2.- Selecciona o busca los productos</p>
            <Select
                className="mt-3 text-black font-bold"
                options={ allProductos }
                onChange={ opcion => seleccionarProducto(opcion) }
                isMulti={true}
                getOptionValue={ opciones => opciones.id }
                getOptionLabel={ opciones => `${opciones.descripcion} - ${opciones.stock} Disponibles` }
                placeholder="Busque o Seleccione el producto"
                noOptionsMessage={() => "No hay resultados" }
            />

        </>
    );
}

export default AsignarProductos;