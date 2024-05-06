import { formatearDinero } from "../helpers";
import useVesuvio from "../hooks/useVesuvio";
import { useAuth } from "../hooks/useAuth";
import ResumenProducto from "./ResumenProducto";
import React, { useState, useEffect } from 'react';
import clienteAxios from "../config/axios";


export default function Resumen({ token }) {
    const { pedido, total, handleSubmitNuevaOrden, metodoPago, setMetodoPago } = useVesuvio();
    const { logout } = useAuth({})
    const [listaMetodosPago, setListaMetodosPago] = useState([]);
    const comprobarPedido = () => pedido.length === 0;


    const handleSubmit = e => {
        e.preventDefault();
        handleSubmitNuevaOrden();
    }


    //Funcion para traes los metodos de pago del backend

    const obtenerMetodoPago = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clienteAxios('/api/metodoPago', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setListaMetodosPago(data ?? [])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        obtenerMetodoPago()
    }, [token])


    // Función para manejar el cambio de método de pago seleccionado
    const handleMetodoPagoChange = (event) => {
        metodoPago(event.target.value);
    };


    return (
        <aside className="w-72 h-screen overflow-y-scroll p-4">
            <div className="my-0 pxl-4 text-2xl">
                <button
                    type="button"
                    className="text-center bg-red-500 w-full p-2 font-bold text-white 
                    truncate"

                    onClick={logout}
                >
                    Salir
                </button>
            </div>
            <h1 className=" mt-3 text-4xl font-black">
                Mi Pedido
            </h1>
            <p className="text-lg my-5">
                Resumen de tu pedido:
            </p>

            <div className="py-0 max-h-80 overflow-y-auto">
                {pedido.length === 0 ? (
                    <p className="text-center text-2xl">
                        No hay elementos en tu pedido aún
                    </p>
                ) : (
                    //change for resolve error map
                    pedido?.map(producto => (
                        <ResumenProducto
                            key={producto.id}
                            producto={producto}
                        />
                    ))
                )}
            </div>

            <p className="py-0 text-3xl font-black">
                Total: {''}
                {formatearDinero(total)}
            </p>

            {/* Metodo de pago */}
            <div >
                <h2 className="mt-4 text-1xl font-black"
                >Selecciona un método de pago:</h2>

                {listaMetodosPago?.map((metodoPago) => (

                    <div className="text-lg my-1"
                        key={metodoPago.id}>
                        <input
                            type="radio"
                            id={metodoPago.id}
                            name="metodoPago"
                            value={metodoPago.id}
                            onChange={() => setMetodoPago(metodoPago.id)}
                        />
                        <label htmlFor={metodoPago.metodoPago}>{metodoPago.metodoPago}</label>
                    </div>
                ))}
            </div>

            <p className="text-xl font-black">
                Cuotas de: {''}
                {formatearDinero(total / 6)}
            </p>

            <div>
                {metodoPago.id === 3 && (
                    <p>
                        Cuotas de: {formatearDinero(total / 6)} {formatearDinero(total)}
                    </p>
                )}
            </div>

            <form
                className="w-full"
                onSubmit={handleSubmit}
            >
                <div className="mt-5">
                    <input
                        type="submit"
                        className={`${comprobarPedido() ?
                            'bg-indigo-100' :
                            'bg-green-600 hover:bg-green-800'} 
                            px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer`}
                        value="Confirmar Pedido"

                        disabled={comprobarPedido()}

                    />
                </div>
            </form>
        </aside>
    )
}