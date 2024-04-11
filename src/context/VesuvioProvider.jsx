import { createContext, useState, useEffect } from "react"
import { toast } from "react-toastify"
import clienteAxios from "../config/axios";

const VesuvioContext = createContext();

const VesuvioProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [modal, setModal] = useState(false);
    const [producto, setProducto] = useState({});
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) =>
            (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    const obtenerCategorias = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clienteAxios('/api/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCategorias(data.data)
            setCategoriaActual(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    // const handleClickCategoria = id => {
    //     const categoria = categorias.filter(categoria => categoria.id === id)[0]
    //     setCategoriaActual(categoria)
    // }
    // cambio en la funcion handleClickCategoria para resolver el error filter.
    const handleClickCategoria = id => {
        const categoria = categorias?.filter(categoria => categoria.id === id)[0]
        if (categoria) setCategoriaActual
    }

    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleAgregarPedido = ({ categoria_id, ...producto }) => {
        if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id ===
                producto.id ? producto : pedidoState)
            setPedido(pedidoActualizado)
            toast.success('Guardado con exito')
        } else {
            setPedido([...pedido, producto])
            toast.success('Producto agregado al pedido')
        }
    }

    const handleEditarCantidad = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.error('Producto eliminado')
    }

    const handleSubmitNuevaOrden = async (logout) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clienteAxios.post('/api/pedidos',
                {
                    total,
                    //change for resolve error map??
                    productos: pedido?.map(producto => {
                        return {
                            id: producto.id,
                            cantidad: producto.cantidad
                        }
                    })
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            toast.success(data.message);
            setTimeout(() => {
                setPedido([])
            }, 1000);

            // Cerrar la sesión del usuario
            setTimeout(() => {
                localStorage.removeItem('AUTH_TOKEN');
                logout();
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }


    const handleClickCompletarPedido = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }


    const handleClickProductoAgotado = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/productos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <VesuvioContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProducto,
                total,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado

            }}
        >{children}</VesuvioContext.Provider>
    )

}
export {
    VesuvioProvider
}
export default VesuvioContext