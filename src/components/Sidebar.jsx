import useVesuvio from "../hooks/useVesuvio"
import Categoria from "./Categoria"

export default function Sidebar() {

    const { categorias } = useVesuvio()
    return (
        <aside className="md:w-72">
            <div className="p-4">
                <img
                    className="w-40"
                    src="img/logo.svg"
                    alt="Imagen Logo"
                />
            </div>
            <div className="mt-10">
                {categorias.map(categoria => (
                    <Categoria                  //props en react  de categoria
                        key={categoria.id}
                        categoria={categoria}
                    />
                ))}

            </div>

            <div className="my-5 px-5">
                <button
                    type="button"
                    className="text-center bg-red-500 w-full p-3 font-bold text-white 
          truncate"
                //onClick={logout}
                >
                    Cancelar Orden
                </button>
            </div>

        </aside>
    )
}
