"use client"
import UseAlmacen from '@/hooks/UseAlmacen';

const Total = () => {

    const { total } = UseAlmacen()

    return (  
        <div className="flex items-center mt-5 justify-between bg-white p-3 ">
            <h2 className="text-black text-lg font-bold">Total a pagar: </h2>
            <p className="text-blue-700 text-2xl mt-0 font-bold">$ {total}</p>
        </div>
     );
}
export default Total