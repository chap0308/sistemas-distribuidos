"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { clienteAxios } from "@/config/clienteAxios";
import { toast } from "react-toastify";
import Link from "next/link";


const PageIdCliente = ({ params: { id: idCliente } }) => {
    const [errorServidor, setErrorServidor] = useState("");
    const [datosForm, setDatosForm] = useState({});
    
    useEffect(() => {
        const obtenerClientesById = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const { data } = await clienteAxios.get(`/clientes/${idCliente}`, config);
                // console.log(data);
                setDatosForm(data)
            } catch (error) {
                console.log(error);
            }
        };
        obtenerClientesById();
    }, [idCliente]);

    // console.log(datosForm);

    const router = useRouter();

    const {
        register, 
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        //* para usar esto para un update
        defaultValues: {
            nombre: "",
            apellido: "",
            email: "",
            telefono: "",
        },
        values: datosForm,//! importante para colocar los datos en los inputs
        mode: "onBlur",
        reValidateMode: "onChange",
        resetOptions: {
            keepDirtyValues: true, // user-interacted input will be retained
            keepErrors: true, // input errors will be retained with value update
        },
    });

    const onSubmit = handleSubmit(async (datos) => {
        
        try {
            const { data } = await clienteAxios.put(`/clientes/${idCliente}`, datos);
            if (data) {
                setDatosForm({});
                toast.success(
                    "Cliente Actualizado correctamente, redireccionando...",
                    {
                        theme: "colored",
                    }
                );
                // reset();
                setTimeout(() => {
                    toast.dismiss();
                    router.push("/clientes");
                }, 3000);
            }
        } catch (error) {
            // console.log(error);
            // console.log(error?.response?.data?.message);//!RESPUESTA DEL BACKEND
            if (error?.response?.data?.message) {
                setErrorServidor(error?.response?.data?.message);
            }

            setTimeout(() => {
                setErrorServidor("");
            }, 3000);
        }
        return;
    });

    return (
        <div className="flex flex-col items-center justify-center md:my-0 md:mt-20">
            <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <Image
                    className="w-8 h-8 mr-2"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                    alt="logo"
                    width={32}
                    height={32}
                />
                Actualizar Cliente
            </h1>
            
            <form
                className="w-[90%] md:w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
                onSubmit={onSubmit}
            >
                <div className="p-5 md:p-8 md:grid md:gap-8">
                    <div className="grid md:grid-cols-2 md:gap-5">
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="nombre"
                                id="nombre"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                {...register("nombre", {
                                    required: {
                                        value: true,
                                        message: "El nombre es requerido",
                                    },
                                    maxLength: {
                                        value: 20,
                                        message:
                                            "El nombre no debe ser mayor a 20 caracteres",
                                    },
                                    minLength: {
                                        value: 2,
                                        message:
                                            "El nombre debe tener al menos 2 caracteres",
                                    },
                                    // value: datosForm.nombre
                                })}
                            />
                            <label
                                htmlFor="nombre"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Nombre
                            </label>
                            {errors.nombre && (
                                <span className="text-red-500 text-sm">
                                    {errors.nombre.message}
                                </span>
                            )}
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="apellido"
                                id="apellido"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                {...register("apellido", {
                                    required: {
                                        value: true,
                                        message: "El apellido es requerido",
                                    },
                                    maxLength: {
                                        value: 20,
                                        message:
                                            "El apellido no debe ser mayor a 20 caracteres",
                                    },
                                    minLength: {
                                        value: 2,
                                        message:
                                            "El apellido debe tener al menos 2 caracteres",
                                    },
                                    // value: datosForm.apellido
                                })}
                            />
                            <label
                                htmlFor="apellido"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Apellido
                            </label>
                            {errors.apellido && (
                                <span className="text-red-500 text-sm">
                                    {errors.apellido.message}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "El correo es requerido",
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "El correo no es válido",
                                },
                                // value: datosForm.email
                            })}
                        />
                        <label
                            htmlFor="email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Correo electrónico
                        </label>
                        {errors.email && (
                            <span className="text-red-500 text-sm">
                                {errors.email.message}
                            </span>
                        )}
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="tel"
                            name="telefono"
                            id="telefono"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            {...register("telefono", {
                                required: {
                                    value: true,
                                    message: "El teléfono es requerida",
                                },
                                pattern:{
                                    value: /^[9]\d{8}$/,
                                    message: "El número debe tener 9 digitos"
                                },
                                // value: datosForm.telefono
                            })}
                        />
                        <label
                            htmlFor="telefono"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Teléfono (987654321)
                        </label>
                        {errors.telefono && (
                            <span className="text-red-500 text-sm">
                                {errors.telefono.message}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Crear Cliente
                    </button>
                    {errorServidor && (
                        <p className="text-red-500 text-sm w-full text-center">
                            {errorServidor}
                        </p>
                    )}
                    <Link
                        href="/clientes"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-right"
                    >
                        Volver
                    </Link>
                </div>
            </form>
        </div>
    );
};
export default PageIdCliente;
