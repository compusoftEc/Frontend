import useVesuvio from "../hooks/useVesuvio"
import { useEffect, useState } from 'react'
import Categoria from "./Categoria"
import { useAuth } from "../hooks/useAuth"
import clienteAxios from "../config/axios";


export default function Siderbar({ token, setCategoriaId }) {

    // const { categorias } = useVesuvio()
    const { logout, user } = useAuth({ middleware: 'auth' });
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});

    const obtenerCategorias = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clienteAxios('/api/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCategorias(data.data ?? [])
            setCategoriaActual(data.data[0] ?? {})
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        obtenerCategorias()
    }, [token])

    return (
        <aside className="md:w-69" >
            {/* <div className="p-1">
                <img
                    className="w-20 h-20 m-auto"
                    src="img/logo.png"
                    alt="Imagen Logo"
                />
            </div> */}
            <p className=" mt-5 text-2xl text-center font-black">Bienvenido: {user?.name}</p>

            <div className="mt-5">
                {/* change for resolve error map */}
                {categorias?.map(categoria => (
                    <Categoria
                        key={categoria.id}
                        categoriaActual={categoriaActual}
                        categoria={categoria}
                        setCategoriaId={setCategoriaId}
                    />
                ))}
            </div>


        </aside>
    )
}
