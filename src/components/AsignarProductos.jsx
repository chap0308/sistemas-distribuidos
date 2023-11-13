"use client";
import UseAlmacen from "@/hooks/UseAlmacen";
import { useEffect, useState } from "react";
import Select from "react-select";
import { clienteAxios } from "@/config/clienteAxios";

const AsignarProductos = ({setMensajes}) => {
    // state local del componente
    const [productos, setProductos] = useState([]);
    const [idProducto, setIdProducto] = useState("");
    const [allProductos, setAllProductos] = useState([]);

    const { agregarProducto, actualizarTotal } = UseAlmacen();

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const { data } = await clienteAxios.get("/productos");
                setAllProductos(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerProductos();
    }, []);

    useEffect(() => {
        // console.log(productos); //! importante
        // TODO: Función para pasar a PedidoState.js
        //! condicionamos el useEffect para asegurarnos de que no venga como null el state de productos, y tambien, actualizamos el total
        if (productos == null) {
            setProductos([]);
            actualizarTotal();
        } else {
            agregarProducto(productos);
            actualizarTotal();
        }
    }, [productos]);

    //* funcion para colocar en el state productos
    const seleccionarProducto = (producto) => {
        console.log(producto);
        setProductos(producto);
    };

    const buscarProductoById = (e) => {
        e.preventDefault();
        const producto = allProductos.find(
            (producto) => producto.id == idProducto
        );
        if (producto) {
            // console.log(producto);
            // console.log(productos);
            //* Codigo para verificar si el id ya está en el state productos
            if (productos.find((p) => p.id == producto.id)) {
                setMensajes(["El producto ya está agregado"]);
                setTimeout(() => {
                    setMensajes([]);
                }, 2000);
                return;
            }
            //* Codigo para agregar producto al state productos
            setProductos((productos) => [...productos, producto]);
            setIdProducto("");

        } else {
            setMensajes(["No se encontró el producto"]);
            setTimeout(() => {
                setMensajes([]);
            }, 2000);
        }
    };

    return (
        <>
            <div className="flex justify-between mt-10 my-2">
                <p className=" w-[20rem] bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
                    2.- Selecciona o busca los productos
                </p>
                <input
                    type="number"
                    placeholder="Busque por ID"
                    className="bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold w-[8rem]"
                    value={idProducto}
                    onChange={(e) => setIdProducto(e.target.value)}
                />
            </div>
            <div className="flex justify-end">
            <button
                className="bg-sky-600 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-700 transition-colors ease-in-out duration-300 cursor-pointer mb-5"
                type="button"
                onClick={buscarProductoById}
            >
                Buscar
            </button>
            </div>
            
            <Select
                className=" text-black font-bold"
                options={allProductos}
                value={productos}
                onChange={(opcion) => seleccionarProducto(opcion)}
                isMulti={true}
                getOptionValue={(opciones) => opciones.id}
                getOptionLabel={(opciones) =>
                    `${opciones.descripcion} - ${opciones.stock} Disponibles`
                }
                placeholder="Busque o Seleccione el producto"
                noOptionsMessage={() => "No hay resultados"}
            />
        </>
    );
};

export default AsignarProductos;
