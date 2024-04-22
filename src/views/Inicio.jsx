import useSWR from 'swr'
import Producto from '../components/Producto'
import clienteAxios from '../config/axios'
import useVesuvio from '../hooks/useVesuvio'
import { useEffect, useState } from 'react'
//import { productos as data } from '../data/productos'

export default function Inicio({ token, categoriaId }) {

    const { categoriaActual } = useVesuvio()
    const [productos, setProductos] = useState([])

    // Consulta SWR

    // const token = localStorage.getItem('AUTH_TOKEN');
    const fetcher = () => clienteAxios('/api/productos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(data => data.data.data)

    // change for resolve error filter
    // const productos = data.filter(producto => producto.categoria_id === categoriaActual.id)

    // const { data, error, isLoading } = useSWR('/api/productos', fetcher)
    // if (isLoading) return 'Cargando...';
    // return productos

    // const productos = data?.filter(producto => producto.categoria_id === categoriaActual.id)

    const obtenerProductos = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clienteAxios('/api/productos/' + categoriaId, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setProductos(data.data ?? [])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        obtenerProductos()
    }, [token, categoriaId])



    return (
        <>
            {/* <h1 className='text-4xl font-black'>{categoriaActual.nombre}</h1> */}
            <p className='text-2xl my-5'>
                Elige y personaliza tu pedido a continuación:
            </p>

            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                {productos?.map(producto => (
                    <Producto
                        key={producto.id}
                        producto={producto}
                        botonAgregar={true}
                    />
                ))}
            </div>
        </>
    )
}
