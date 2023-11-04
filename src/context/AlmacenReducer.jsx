import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS,
    ACTUALIZAR_TOTAL,
} from '@/types'

//* Para que funcione bien, coloca en el ESLINT: "import/no-anonymous-default-export": [2, {"allowArrowFunction": true}]
//! todo esto proviene de pedidoState
export default ( state, action ) => {
    //* en cada switch se hace una copia de state y se almacena los nuevos datos.
    switch(action.type) {
        case SELECCIONAR_CLIENTE: //! el case se le asigna en cada funcion mediante la variable type de la funcion dispatch
            return {
                ...state,//! creamos una copia para no perder los datos
                cliente: action.payload //! esta variable cliente se le asigna la variable initialState en PedidoState. Y se extrae usando action.payload
            }
        case SELECCIONAR_PRODUCTO: 
            return {
                ...state,
                productos: action.payload
            }
        case CANTIDAD_PRODUCTOS:
            return {
                ...state,
                productos: state.productos.map( producto => producto.id === action.payload.id ? producto = action.payload : producto )
            }
        case ACTUALIZAR_TOTAL:
            return {
                ...state,
                total: +(state.productos.reduce( (nuevoTotal, articulo) => nuevoTotal += articulo.precio * articulo.cantidad, 0 )).toFixed(2)
            }

        default: 
            return state
    }
}