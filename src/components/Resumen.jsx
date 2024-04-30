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

    const [mensajeMetodoPago, setMensajeMetodoPago] = useState(""); // Estado para el mensaje del método de pago
    const [cuotas, setCuotas] = useState(0); // Estado para el valor de las cuotas

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

    // Función para manejar el cambio de selección del método de pago y mostrar el mensaje
    const handleMetodoPagoChange = (id) => {
        setMetodoPago(id); // Establecer el método de pago seleccionado

        // Mostrar el mensaje correspondiente al método de pago seleccionado
        switch (id) {
            case 2:
                setMensajeMetodoPago(
                    "Realiza tus pagos a:\n"+
                    "<strong>Marco Antonio Caiza Cerón</strong>" +
                    " con <strong>CI 1709766453</strong>\n\n" +
                    "Envía el comprobante al<strong> 0999729628</strong>\n\n" +
                    "Produbanco-Corriente:\n" +
                    "<b>Cta. 01022937245</b>\n" +
                    "Pichincha-Ahorros\n" +
                    "<b>Cta. 2205233642</b>\n" +
                    "Guayaquil-Corriente\n" +
                    "<b>Cta. 0013711968</b>"
                );
                break;
            case 3:
                const cuotasValor3 = total / 3; // Calcular el valor de las cuotas
                setCuotas(cuotasValor3); // Actualizar el estado de las cuotas
                setMensajeMetodoPago(`Cuotas de${formatearDinero(cuotasValor3)}`);
                break;
            case 4:
                const cuotasValor6 = total / 6; // Calcular el valor de las cuotas
                setCuotas(cuotasValor6); // Actualizar el estado de las cuotas
                setMensajeMetodoPago(`Cuotas de ${formatearDinero(cuotasValor6)}`);
                break;
            default:
                setMensajeMetodoPago(""); // Limpiar el mensaje si no hay selección especial
                setCuotas(0); // Restablecer el valor de las cuotas
        }
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
             <div>
                {pedido.length === 0 ? (
                    <p></p>
                ) : (
                    <div>
                        {/* Metodo de pago */}
                        <h2 className="py-0 mt-4 text-1xl font-black"
                        >Selecciona un método de pago:</h2>
                            {listaMetodosPago?.map((metodoPago) => (
                                <div className="text-lg my-1"
                                    key={metodoPago.id}>
                                    <input
                                    type="radio"
                                    id={metodoPago.id}
                                    name="metodoPago"
                                    value={metodoPago.id} 
                                    onChange={() => {
                                    setMetodoPago(metodoPago.id);
                                    handleMetodoPagoChange(metodoPago.id);
                                    }}
                                    />
                                    <label htmlFor={metodoPago.metodoPago}>{'\t' + metodoPago.metodoPago}</label>
                                </div>
                        ))}

                        {/* Mostrar el mensaje del método de pago */}
                            {mensajeMetodoPago && (
                            <div className="text-lg my-1 font-">
                                {mensajeMetodoPago.includes('<strong>') ? (
                                <p  style={{ whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: mensajeMetodoPago }}></p>
                                ) : (
                                <p style={{ whiteSpace: 'pre-line' }}>{mensajeMetodoPago}</p>
                            )}
                            </div>
                            )}
                    </div>
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