"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authAxios } from "@/config/clienteAxios";
import { toast } from "react-toastify";

const RegistroPage = () => {
    const [errorServidor, setErrorServidor] = useState("");

    const router = useRouter();

    const {
        register, //*para registrar las variables
        handleSubmit,
        formState: { errors },
        watch, //* este tiene todos los datos del objeto data y podemos seleccionarlo: watch("nombre"), watch("correo").
        setValue, //*podemos darle un valor a una variable
        reset,
    } = useForm({
        //* para usar esto para un update
        defaultValues: {
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            confirmarPassword: "",
        },
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    const onSubmit = handleSubmit(async (datos) => {
        const { confirmarPassword, password: contraseña, ...rest } = datos;
        try {
            const { data } = await authAxios.post("/register", {
                contraseña,
                ...rest,
            });
            if (data) {
                toast.success("Te has registrado correctamente, redireccionando...", {
                    theme: "colored"
                });
                reset();
                setTimeout(() => {
                    toast.dismiss();
                    router.push("/");
                }, 3000);
            }
        } catch (error) {
            // console.log(error);
            // console.log(error?.response?.data?.message);//!RESPUESTA DEL BACKEND
            if(error?.response?.data?.message){
                setErrorServidor(error?.response?.data?.message);
            }

            setTimeout(() => {
                setErrorServidor("");
            }, 3000);
        }
        return;
    });
    return (
        <div className="flex flex-col items-center justify-center mt-6 md:my-0 md:h-screen">
            <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <Image
                    className="w-8 h-8 mr-2"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                    alt="logo"
                    width={32}
                    height={32}
                />
                Registro
            </h1>
            <form
                className="w-[90%] md:w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
                onSubmit={onSubmit}
            >
                <div className="p-5 md:p-8 md:grid md:gap-4">
                    <div className="grid md:grid-cols-2 md:gap-6">
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
                            type="password"
                            name="password"
                            id="password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "La contraseña es requerida",
                                },
                                minLength: {
                                    value: 6,
                                    message:
                                        "La contraseña debe tener al menos 6 caracteres",
                                },
                            })}
                        />
                        <label
                            htmlFor="password"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Contraseña
                        </label>
                        {errors.password && (
                            <span className="text-red-500 text-sm">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="password"
                            name="confirmarPassword"
                            id="confirmarPassword"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            {...register("confirmarPassword", {
                                required: {
                                    value: true,
                                    message:
                                        "Confirmar contraseña es requerido",
                                },
                                minLength: {
                                    value: 6,
                                    message: "Debe tener al menos 6 caracteres",
                                },
                            })}
                        />
                        <label
                            htmlFor="confirmarPassword"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Confirmar Contraseña
                        </label>
                        {errors.confirmarPassword && (
                            <span className="text-red-500 text-sm">
                                {errors.confirmarPassword.message}
                            </span>
                        )}
                    </div>

                    {watch("confirmarPassword").length >= 6 &&
                    watch("password").length >= 6 &&
                    watch("password") != watch("confirmarPassword") ? (
                        <span className="text-red-500 text-sm block mb-3">
                            Las contraseñas no coinciden
                        </span>
                    ) : null}

                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Registrarse
                    </button>
                    {errorServidor && (
                            <p className="text-red-500 text-sm w-full text-center">
                                {errorServidor}
                            </p>
                        )}
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-5">
                        Ya tienes una cuenta?{" "}
                        <Link
                            href="/"
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                            Inicia Sesión
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};
export default RegistroPage;
