"use client";
import Datepicker from "tailwind-datepicker-react";
import { useEffect, useState } from "react";
import UseAlmacen from "@/hooks/UseAlmacen";
import { clienteAxios } from "@/config/clienteAxios";
import { fechaActualFormateada } from "@/helpers/fechaActual";
import Link from "next/link";
import Pedido from "@/components/Pedido";

const options = {
    title: "Demo Title",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: "Clear",
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
        background: "bg-gray-700 dark:bg-gray-800",
        todayBtn: "",
        clearBtn: "",
        icons: "",
        text: "",
        disabledText: "bg-red-500",
        input: "",
        inputIcon: "",
        selected: "",
    },
    icons: {
        // () => ReactElement | JSX.Element
        prev: () => <span>Previous</span>,
        next: () => <span>Next</span>,
    },
    datepickerClassNames: "top-12",
    defaultDate: new Date("2022-01-01"),
    language: "en",
    disabledDates: [],
    weekDays: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
        day: "numeric",
        month: "long",
        year: "numeric",
    },
};

const PedidosPage = () => {
    const [fechaBuscar, setFechaBuscar] = useState();
    const { pedidos, setPedidos } = UseAlmacen();

    const [show, setShow] = useState(false);
    const handleChange = (selectedDate) => {
        const anio = selectedDate.getFullYear(); // Obtener el año
        const mes = (selectedDate.getMonth() + 1).toString().padStart(2, "0"); // Obtener el mes (agregar 1 ya que enero es 0)
        const dia = selectedDate.getDate().toString().padStart(2, "0"); // Obtener el día

        const fechaEnFormato = `${anio}-${mes}-${dia}`;
        setFechaBuscar(fechaEnFormato);
    };
    const handleClose = (state) => {
        setShow(state);
    };

    useEffect(() => {
        // console.log(fechaActualFormateada());
        setFechaBuscar(fechaActualFormateada());
    }, []);

    useEffect(() => {
        if (fechaBuscar) {
            const obtenerPedidosPorFecha = async () => {
                try {
                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    };
                    const { data } = await clienteAxios(
                        `/pedidos?fecha=${fechaBuscar}`,
                        config
                    );
                    setPedidos(data);
                } catch (error) {
                    console.log(error);
                }
            };
            obtenerPedidosPorFecha();
        }
    }, [setPedidos, fechaBuscar]);

    return (
        <>
            <h1 className="text-2xl text-white font-bold mt-4">Pedidos</h1>
            <Link
                href={"/nuevopedido"}
                className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center"
            >
                Nuevo Pedido
            </Link>
            <div className="w-1/4">
                <Datepicker
                    options={{
                        language: "es",
                        weekDays: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
                    }}
                    onChange={(e) => handleChange(e)}
                    show={show}
                    setShow={handleClose}
                />
            </div>

            {pedidos.length === 0 ? (
                <p className="mt-5 text-center text-2xl">No hay pedidos en este día</p>
            ) : (
                pedidos.map((pedido) => (
                    <Pedido key={pedido.id} pedido={pedido} />
                ))
            )}
        </>
    );
};
export default PedidosPage;
