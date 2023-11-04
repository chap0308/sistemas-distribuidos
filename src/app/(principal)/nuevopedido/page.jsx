"use client";
import { useState } from "react";
import AsignarCliente from "@/components/AsignarCliente";
import AsignarProductos from "@/components/AsignarProductos";
import ResumenPedido from "@/components/ResumenPedido";
import Total from "@/components/Total";
import { clienteAxios } from "@/config/clienteAxios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UseAlmacen from "@/hooks/UseAlmacen";
import { fechaActualFormateada } from "@/helpers/fechaActual";
import Link from "next/link";
import { useForm } from "react-hook-form";

const MySwal = withReactContent(Swal);

const NuevoPedidoPage = () => {
    const router = useRouter();

    const [mensajes, setMensajes] = useState([]);

    const { cliente, productos, total } = UseAlmacen();

    //! TODO: select + hook form
    // const {
    //     handleSubmit,
    //     control,
    //     formState: { errors },
    // } = useForm({
    //     defaultValues: {
    //         clienteFormulario: "",

    //     },
    // });

    const validarPedido = () => {
        //! el every verifica que todos los del array cumplan una condicion
        return !productos.every((producto) => producto.cantidad > 0) ||
            +total === 0 ||
            Object.keys(cliente).length === 0
            ? " opacity-50 cursor-not-allowed "
            : "";
    };

    const crearNuevoPedido = async () => {
        // console.log(cliente);
        // console.log(productos);
        // console.log(total);
        if(total == 0 ){
            setMensajes(["Faltan completar los datos"])
            setTimeout(() => {
                setMensajes([])
            }, 3000)
            return
        }
        console.log("hola");
        const productoId = productos.map((producto) => producto.id);
        const cantidad = productos.map((producto) => producto.cantidad);
        const precioUnitario = productos.map(
            (producto) => +producto.precio.toFixed(2)
        );
        const precioVenta = productos.map(
            (producto) => +(producto.precio * producto.cantidad).toFixed(2)
        );
        const mensajesStocks = productos
            .map((producto) => {
                const stockDisponible = producto.stock - producto.cantidad;
                return stockDisponible < 0
                    ? `La cantidad del producto ${producto.descripcion} sobrepasa el stock`
                    : null;
            })
            .filter((mensaje) => mensaje !== null);

        if (mensajesStocks.length > 0) {
            setMensajes(mensajesStocks);
            setTimeout(() => {
                setMensajes([]);
            }, 5000);
            return;
        }

        const stockActualizado = productos.map(
            (producto) => producto.stock - producto.cantidad
        );
        // console.log(stockActualizado);
        // console.log(precioUnitario);
        // console.log(precioVenta);
        // console.log(cantidad);
        // console.log(productoId);

        const pedidoInput = {
            fecha: fechaActualFormateada(),
            clienteId: cliente.id,
            precioTotal: total,
        };
        const detallePedidoInput = {
            productoId,
            cantidad,
            precioUnitario,
            precioVenta,
        };
        const productosActualizadosInput = { stock: stockActualizado };
        const requestBody = {
            pedidoInput,
            detallePedidoInput,
            productosActualizadosInput,
        };

        try {
            //! crear nuevo pedido

            const { data } = await clienteAxios.post("/pedidos", requestBody);
            // console.log(data);
            if (data) {
                // Mostrar alerta
                MySwal.fire(
                    "Correcto",
                    "El pedido se registró correctamente",
                    "success"
                ).then(() => {
                    router.push("/pedidos");
                });
            }
        } catch (error) {
            console.log(error);

            setTimeout(() => {
                setMensajes([]);
            }, 3000);
        }
    };

    const mostrarMensaje = (mensaje) => {
        return (
            <div
                key={mensaje}
                className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto"
            >
                <p className="text-red-600 font-bold text-base">{mensaje}</p>
            </div>
        );
    };

    return (
        <>
            <h1 className="text-2xl text-white font-light">
                Crear Nuevo Pedido
            </h1>
            <Link
                href={"/pedidos"}
                className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center"
            >
                Volver
            </Link>

            {mensajes.length > 0 &&
                mensajes.map((mensaje) => mostrarMensaje(mensaje))}

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <AsignarCliente />
                    <AsignarProductos />
                    <ResumenPedido />
                    <Total />

                    <button
                        type="button"
                        className={` bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()} `}
                        onClick={() => crearNuevoPedido()}
                    >
                        Registrar Pedido
                    </button>
                </div>
            </div>
        </>
    );
};
export default NuevoPedidoPage;
