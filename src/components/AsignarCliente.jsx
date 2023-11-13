"use client";
import { useState, useEffect } from "react";
import Select from "react-select";
import UseAlmacen from "@/hooks/UseAlmacen";
import { clienteAxios } from "@/config/clienteAxios";

const AsignarCliente = () => {
    const [cliente, setCliente] = useState(null);
    const [idCliente, setIdCliente] = useState("");
    const [clientes, setClientes] = useState([]);

    // Context de pedidos
    const { agregarCliente } = UseAlmacen();

    //!consultar mediante axios
    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const { data } = await clienteAxios.get("/clientes");
                setClientes(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerClientes();
    }, []);

    useEffect(() => {
        // console.log(cliente);
        agregarCliente(cliente);
    }, [cliente]);

    const seleccionarCliente = (cliente) => {
        // console.log(cliente);
        setIdCliente(cliente.id)
        setCliente(cliente);
    };

    const seleccionarClienteById = (e) => {
        setIdCliente(e.target.value);
        // console.log(e.target.value);
        const cliente = clientes.find((cliente) => cliente.id == e.target.value);
        // console.log(cliente);
        if(cliente){
            setCliente(cliente);
        }else{
            setCliente(null);
        }
    };

    return (
        <>
            <div className="flex justify-between mt-10 my-2">
                <p className="w-[20rem] bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
                    1.- Selecciona o busca un cliente
                </p>
                <input
                    type="number"
                    placeholder="Busque por ID"
                    className="w-[8rem] bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold"
                    value={idCliente}
                    onChange={seleccionarClienteById}
                />
            </div>
            <Select
                className="mt-3 text-black font-bold"
                options={clientes}
                value={cliente}
                onChange={(opcion) => seleccionarCliente(opcion)}
                getOptionValue={(opciones) => opciones.id}
                getOptionLabel={(opciones) => opciones.nombre}
                placeholder="Busque o Seleccione el Cliente"
                noOptionsMessage={() => "No hay resultados"}
            />
        </>
    );
};

export default AsignarCliente;
