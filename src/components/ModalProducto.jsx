import { useState, useEffect } from "react";
import useVesuvio from "../hooks/useVesuvio"
import { formatearDinero } from "../helpers";
import { link } from "@nextui-org/react";

export default function ModalProducto() {

    const { producto, handleClickModal, handleAgregarPedido, pedido } = useVesuvio();
    const [cantidad, setCantidad] = useState(1)
    const [edicion, setEdicion] = useState(false)

    useEffect(() => {
        if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
            const productoEdicion = pedido.filter(pedidoState => pedidoState.id ===
                producto.id)[0]
            setCantidad(productoEdicion.cantidad)
            setEdicion(true)
        }
    }, [pedido])
    return (
        <div className="md:flex items-center gap-10">
            <div className="md:w-1/3">
                <img
                    alt={`Imagen producto ${producto.nombre}`}
                    src={`/img/${producto.imagen}.png`}
                />
            </div>


            <div>
                <div className="flex justify-end"> {/* mueve el boton de cerrar del lado derecho*/}
                    <button onClick={handleClickModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                <div className="md:w-2/3">
                    <h1 className='text-4xl font-bold mt-5'>
                        {producto.nombre}
                    </h1>
                    <h1 className='text mt-5 text-1xl font-bold'>
                        {producto.descripción}
                    </h1>
                    <p className='mt-5 font-black text-2xl text-indigo-600'>
                    <a href={producto.link}> Mas información </a>
                    </p>

                    <p className='mt-5 font-black text-5xl text-red-700'>
                        {formatearDinero(producto.precio)}
                    </p>
                    <div className="flex gap-4 mt-5">

                        <button
                            type="button"
                            onClick={() => {
                                if (cantidad <= 1) return
                                setCantidad(cantidad - 1);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 
                            12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                        </button>

                        <p className="text-3xl">{cantidad}</p>

                        <button
                            type="button"
                            onClick={() => {
                                if (cantidad >= 10) return
                                setCantidad(cantidad + 1);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 
                            0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>


                        </button>

                    </div>

                    <button
                        type="button"
                        className='bg-indigo-600 hover:bg-indigo-80 px-5 py-2 
                     mt-5 text-white uppercase rounded-lg font-bold '
                        onClick={() => {
                            handleAgregarPedido({ ...producto, cantidad }) //... agregar todo en un objeto
                            handleClickModal()//cierra el modal
                        }}
                    >
                        {edicion ? 'Guardar Cambios' : 'Agregar al Pedido'}
                    </button>


                </div>


            </div>
        </div>
    )
}
