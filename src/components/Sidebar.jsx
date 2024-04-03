import useVesuvio from "../hooks/useVesuvio"
import Categoria from "./Categoria"
import { useAuth } from "../hooks/useAuth"

export default function Siderbar() {

    const { categorias } = useVesuvio()
    const { logout, user } = useAuth({ middleware: 'auth' });

    return (
        <aside className="md:w-72">
            <div className="p-3">
                <img
                    className="w-35"
                    src="img/logo.svg"
                    alt="Imagen Logo"
                />
            </div>
            <p className="my-0 text-xl text-center font-black">Bienvenido: {user?.name}</p>
            <div className="mt-10">
                {categorias.map(categoria => (
                    <Categoria
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
                    onClick={logout}
                >
                    Cancelar Orden
                </button>
            </div>

        </aside>
    )
}
