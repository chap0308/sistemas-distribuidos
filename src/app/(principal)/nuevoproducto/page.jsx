"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { clienteAxios, uploadAxiosFromNext } from "@/config/clienteAxios";
import { toast } from "react-toastify";
import Link from "next/link";

const NuevoProductoPage = () => {
    const [errorServidor, setErrorServidor] = useState("");

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
            descripcion: "",
            imagen: "",
            precio: "",
            stock: "",
        },
        mode: "onBlur",
        reValidateMode: "onChange",

    });

    const onSubmit = handleSubmit(async (datos) => {
        // console.log(datos.imagen[0])
        // const file = datos.imagen[0]
        // return
        // console.log(datos.imagen[0].name);
        const { imagen, ...rest } =datos;
        rest.imagen = imagen[0].name;
        // const formData = new FormData();
        // formData.append('file', file)
        try {
            // const config = {
            //     headers: {
            //         "Content-Type": "multipart/form-data",
            //         "Content-Type": "application/json",
            //     }
            // }
            // await uploadAxiosFromNext.post("/upload", datos, config);

            // const response = await fetch("/api/upload",{
            //     method: "POST",
            //     body: formData,
            //     headers: {
            //         "Content-Type": "multipart/form-data",
            //     },
            // });
            // const nuevosDatos = await response.json();
            const { data } = await clienteAxios.post("/productos", rest);

            
            if (data) {
                toast.success(
                    "Producto registrado correctamente, redireccionando...",
                    {
                        theme: "colored",
                    }
                );
                reset();
                setTimeout(() => {
                    toast.dismiss();
                    router.push("/productos");
                }, 3000);
            }
        } catch (error) {
            console.log(error);
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
                Nuevo Producto
            </h1>

            <form
                className="w-[90%] md:w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
                onSubmit={onSubmit}
            >
                <div className="p-5 md:p-8 md:grid md:gap-8">
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="descripcion"
                            id="descripcion"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            {...register("descripcion", {
                                required: {
                                    value: true,
                                    message: "La descripcion es requerida",
                                },
                                maxLength: {
                                    value: 20,
                                    message:
                                        "La descripcion no debe ser mayor a 20 caracteres",
                                },
                                minLength: {
                                    value: 2,
                                    message:
                                        "La descripcion debe tener al menos 2 caracteres",
                                },
                            })}
                        />
                        <label
                            htmlFor="descripcion"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Descripcion
                        </label>
                        {errors.descripcion && (
                            <span className="text-red-500 text-sm">
                                {errors.descripcion.message}
                            </span>
                        )}
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-5">
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="number"
                                name="precio"
                                id="precio"
                                step="0.01"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                {...register("precio", {
                                    required: {
                                        value: true,
                                        message: "El precio es requerido",
                                    },
                                    min: {
                                        value: 1,
                                        message: "El precio debe ser mayor a 0",
                                    },
                                    pattern: {
                                        value: /^[1-9]\d*(\.\d+)?$/,
                                        message:
                                            "El precio debe ser un número válido",
                                    },
                                })}
                            />
                            <label
                                htmlFor="precio"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Precio
                            </label>
                            {errors.precio && (
                                <span className="text-red-500 text-sm">
                                    {errors.precio.message}
                                </span>
                            )}
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="number"
                                name="stock"
                                id="stock"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                {...register("stock", {
                                    required: {
                                        value: true,
                                        message: "El stock es requerido",
                                    },
                                    min: {
                                        value: 1,
                                        message: "El stock debe ser mayor a 0",
                                    },
                                    pattern: {
                                        value: /^[1-9]\d*$/,
                                        message:
                                            "El stock debe ser un número entero",
                                    },
                                })}
                            />
                            <label
                                htmlFor="stock"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Stock
                            </label>
                            {errors.stock && (
                                <span className="text-red-500 text-sm">
                                    {errors.stock.message}
                                </span>
                            )}
                        </div>
                    </div>
                    <div>
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="imagen"
                        >
                            Coloca la imagen
                        </label>
                        <input
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="user_avatar_help"
                            id="imagen"
                            type="file"
                            {...register("imagen", {
                                required: {
                                    value: true,
                                    message: "La imagen es necesaria",
                                },
                            })}
                        />
                        
                        {errors.imagen && <span className="text-red-500 text-sm">{errors.imagen.message}</span>}
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Crear Producto
                    </button>
                    {errorServidor && (
                        <p className="text-red-500 text-sm w-full text-center">
                            {errorServidor}
                        </p>
                    )}
                    <Link
                        href="/productos"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-right"
                    >
                        Volver
                    </Link>
                </div>
            </form>
        </div>
    );
};
export default NuevoProductoPage;
