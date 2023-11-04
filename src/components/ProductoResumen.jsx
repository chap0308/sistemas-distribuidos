"use client"
import {useState, useEffect } from 'react';
import UseAlmacen from '@/hooks/UseAlmacen';

const ProductoResumen = ({producto}) => {

    const { cantidadProductos, actualizarTotal } = UseAlmacen()
    const [cantidad, setCantidad] = useState(0);

    useEffect(() => {
        // console.log(cantidad);
        actualizarCantidad();
        actualizarTotal();//* cuando hay cambios en la cantidad, se actualiza el total
    }, [ cantidad ])

    const actualizarCantidad = () => {
        const nuevoProducto = {...producto, cantidad: +cantidad  }
        cantidadProductos(nuevoProducto)
    }
    const {descripcion, precio } = producto;

    return ( 
        <div className="md:flex md:justify-between md:items-center mt-5">
            <div className="md:w-2/4 mb-2 md:mb-0">
                <p className="text-sm uppercase">{descripcion}</p>
                <p className="text-sm uppercase">$ {precio}</p>
            </div>

            <input 
                type="number"
                placeholder="Cantidad"
                step="1"
                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-900 font-semibold leading-tight focus:outline-none focus:shadow-outline md:ml-4"
                onChange={ e => setCantidad(e.target.value) }
                value={cantidad}
                min="0"
                required
            />
        </div>
    );
}

export default ProductoResumen;