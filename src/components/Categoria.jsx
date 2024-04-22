import useVesuvio from "../hooks/useVesuvio"
export default function Categoria({ categoria, categoriaActual, setCategoriaId }) {

    //console.log(props.categoria) un prop es un argumento que se pasa entre los componentes de react
    // const { handleClickCategoria, categoriaActual } = useVesuvio();
    const { icono, id, nombre } = categoria


    return (
        <div className={`${categoriaActual.id === id ? "bg-red-600" : 'bg-white'} flex
        // items-center gap-4 border w-full p-3 hover:bg-red-600 cursor-pointer`} >

            < img
                alt="Imagen Icono"
                src={`/img/icono_${icono}.svg`
                } //mezcla string con  una variable
                className="w-12"
            />

            <button
                className="text-lg font-bold cursor-pointer truncate"
                type="button"
                style={{ display: 'block' }}
                onClick={() => setCategoriaId(id)}
            >
                {nombre}
            </button>
        </div >
    )
}
