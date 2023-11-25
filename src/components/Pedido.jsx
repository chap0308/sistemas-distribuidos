const Pedido = ({ pedido }) => {
    // console.log(pedido);
    const {
        id,
        precioTotal: total,
        cliente: { nombre, apellido, telefono, email },
    } = pedido;
    // console.log(pedido.detallePedido);
    // console.log(pedido.detallePedido);

    return (
        // Codigo para validar que el objeto cliente exista

        <div
            className={`mt-4 last-of-type:mb-10 bg-gray-300 rounded-2xl p-6 md:grid md:grid-cols-3 shadow-lg`}
        >
            <div className="md:col-[1/2]">
                <h2 className="font-bold text-xl text-cyan-700 mb-3">
                    Código del Pedido: {id}
                </h2>
                <p className="font-bold text-red-700 text-xl">
                    Cliente:{" "}
                    <span className=" text-black capitalize">
                        {nombre} {apellido}{" "}
                    </span>
                </p>

                {email && (
                    <p className="flex items-center gap-3 my-2 text-blue-500 font-semibold">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                        </svg>

                        {email}
                    </p>
                )}

                {telefono && (
                    <p className="flex items-center gap-3 my-2 text-blue-500 font-semibold">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                                clipRule="evenodd"
                            />
                        </svg>

                        {telefono}
                    </p>
                )}

                {/* <h2 className="text-black font-bold mt-10">
                    Estado Pedido:
                </h2>

                <select
                    className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold "
                    // value={estadoPedido}
                    // onChange={(e) => cambiarEstadoPedido(e.target.value)}
                >
                    <option value="COMPLETADO">COMPLETADO</option>
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="CANCELADO">CANCELADO</option>
                </select> */}
            </div>

            <div className="md:col-[2/4] md:ml-8">
                <h2 className="text-red-700 text-2xl font-bold mt-2">
                    Resumen del Pedido
                </h2>
                <div className="md:grid md:grid-cols-3 ">
                    {pedido.detallePedido.map((articulo, i) => (
                        <div key={articulo.id} className="mt-4 flex justify-start gap-x-3">
                            <div className="text-red-600 font-bold">
                                <p>{i+1}.</p>
                            </div>
                            <div>
                                <p className="text-base text-black font-semibold">
                                    Producto:{" "}
                                    <span className="text-orange-600 capitalize">
                                        {articulo?.producto?.descripcion}{" "}
                                    </span>
                                </p>
                                <p className="text-base text-black font-semibold">
                                    Cantidad:{" "}
                                    <span className="text-orange-600">
                                        {articulo?.cantidad}{" "}
                                    </span>
                                </p>
                                <p className="text-base text-black font-semibold">
                                    Precio Unitario:{" "}
                                    <span className="text-green-600">
                                        {" "}
                                        $ {articulo?.producto?.precio}{" "}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-gray-800 mt-3 ml-3 font-bold ">
                    Total a pagar:
                    <span className="font-bold text-green-600 text-xl">
                        {" "}
                        $ {total}
                    </span>
                </p>

                <button
                    className="uppercase text-sm font-bold  flex items-center mt-4 bg-red-800 px-5 py-2 text-white rounded leading-tight"
                    // onClick={() => confirmarEliminarPedido()}
                >
                    Eliminar Pedido
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 ml-2"
                    >
                        <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </button>
            </div>
        </div>
        
    );
};
export default Pedido;
