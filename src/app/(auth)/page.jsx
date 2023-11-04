"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { authAxios, authAxiosFromNext } from "@/config/clienteAxios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "@/components/Spinner";

export default function Home() {

    const [errorServidor, setErrorServidor] = useState("")
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        register, //*para registrar las variables
        handleSubmit,
        formState: { errors },
        watch, //* este tiene todos los datos del objeto data y podemos seleccionarlo: watch("nombre"), watch("correo").
        setValue, //*podemos darle un valor a una variable
        reset,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        // mode: "onBlur",//! cuando quitamos el mouse del input
        mode: "onBlur", //!para los cambios
        reValidateMode: "onChange", //! despues de que le demos submit al formulario, se activa este prop, pero viene por default "onChange"
    });

    const onSubmit = handleSubmit(async(datos) => {
        const {email, password: contraseña}=datos;
        try {
            const {data: isAdmin} = await authAxios.post("/login", {email, contraseña});
            //*Auth from next
            await authAxiosFromNext.post("/login", {email, contraseña, isAdmin});
            setLoading(true)
            reset();
            setTimeout(() => {
                setLoading(false);
                router.push("/menu");
            }, 3000);
        } catch (error) {
            // console.log(error);
            // console.log(error?.response?.data?.contraseña);//!RESPUESTA DEL BACKEND
            if(error?.response?.data?.contraseña){//! Validaciones del backend
                setErrorServidor(error?.response?.data?.contraseña);
            }else{
                setErrorServidor(error?.response?.data?.message);
            }
            setTimeout(() => {
                setErrorServidor("");
            }, 3000);
        }
    });

    return (
        <div className="flex flex-col items-center justify-center px-6 pt-20 md:p-0 md:h-screen ">
            <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <Image
                    className="w-8 h-8 mr-2"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                    alt="logo"
                    width={32}
                    height={32}
                />
                Iniciar Sesión
            </h1>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Coloca tus datos
                    </h1>
                    <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={onSubmit}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Tu correo electrónico
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@correo.com"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "El correo es requerido",
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                        message: "Correo no válido",
                                    },
                                })}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Contraseña
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                            {errors.password && (
                                <span className="text-red-500 text-sm">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Sign in
                        </button>
                        {errorServidor && (
                            <p className="text-red-500 text-sm w-full text-center">
                                {errorServidor}
                            </p>
                        )}
                        {loading && (
                            <Spinner />
                        )}
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Todavía no tienes una cuenta?{" "}
                            <Link
                                href="/registro"
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            >
                                Regístrate
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
