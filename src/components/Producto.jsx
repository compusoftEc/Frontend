import { formatearDinero } from "../helpers"
import useVesuvio from "../hooks/useVesuvio"

export default function Producto({ producto, botonAgregar = false, botonDisponible = false }) {

    const { handleClickModal, handleSetProducto, handleClickProductoAgotado } = useVesuvio();
    const { nombre, imagen, precio, desCorta } = producto

    return (
        <div className="border p-3 shadow bg-white">
            <img
                alt={`imagen ${nombre}`}
                className="w-full"
                src={`/img/${imagen}.png`}
            />


            <div className="p-5">
                <h3 className="text-2xl font-bold">{nombre}</h3>
                <h4 className="text-1xl">{desCorta}</h4>
                <p className="mt-5 font-black text-4xl text-black-600">
                    {formatearDinero(precio)} 
                </p>
                <p className="text-1xl font-bold text-red-600">Precio incluido IVA</p>

                {botonAgregar && (
                    <button
                        type="button"
                        className="bg-red-800 hover:bg-red-800
                        text-white w-full mt-5 p-3 uppercase font-bold"
                        onClick={() => {
                            handleClickModal();
                            handleSetProducto(producto);
                        }}
                    >
                        Agregar
                    </button>
                )}

                {botonDisponible && (
                    <button
                        type="button"
                        className="bg-red-600 hover:bg-red-800
                        text-white w-full mt-5 p-3 uppercase font-bold"
                        onClick={() => handleClickProductoAgotado(producto.id)}
                    >
                        Producto Agotado
                    </button>
                )}

            </div>
        </div>
    )
}
