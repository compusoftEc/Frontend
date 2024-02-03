import { createContext, useState, useEffect } from "react"
import { toast } from "react-toastify"
import { categorias as categoriasDB } from "../data/categorias"

const VesuvioContext = createContext();

const VesuvioProvider = ({ children }) => {

    const [categorias, setCategorias] = useState(categoriasDB);
    const [categoriaActual, setCategoriaActual] = useState(categorias[0]);
    const [modal, setModal] = useState(false);
    const [producto, setProducto] = useState({});
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) =>
            (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
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
                // handleSubmitNuevaOrden,
                // handleClickCompletarPedido,
                // handleClickProductoAgotado

            }}
        >{children}</VesuvioContext.Provider>
    )

}
export {
    VesuvioProvider
}
export default VesuvioContext