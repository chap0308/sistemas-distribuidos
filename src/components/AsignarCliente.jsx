"use client"
import { useState, useEffect } from 'react';
import Select from 'react-select'
import UseAlmacen from '@/hooks/UseAlmacen';
import {clienteAxios} from '@/config/clienteAxios';


const AsignarCliente = () => {

    const [ cliente, setCliente ] = useState({});
    const [ clientes, setClientes ] = useState([]);

    // Context de pedidos
    const { agregarCliente} = UseAlmacen();

    //!consultar mediante axios
    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const { data } = await clienteAxios.get("/clientes");
                setClientes(data);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerClientes();
    
    }, [])

    useEffect(() => {
        // console.log(cliente);
        agregarCliente(cliente);
    }, [cliente])

    const seleccionarCliente = clientes => {
        setCliente(clientes);
    }

    return ( 

        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">1.- Asigna un Cliente al pedido</p>
            <Select
                className="mt-3 text-black font-bold"
                options={ clientes }
                onChange={ opcion => seleccionarCliente(opcion) }
                getOptionValue={ opciones => opciones.id }
                getOptionLabel={ opciones => opciones.nombre }
                placeholder="Busque o Seleccione el Cliente"
                noOptionsMessage={() => "No hay resultados"}
            />

        </>
    );
}

export default AsignarCliente;