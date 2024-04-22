
import { createRef, useState, React } from "react"
import Modal from "react-modal"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import { useAuth } from "../hooks/useAuth";
import useVesuvio from "../hooks/useVesuvio"

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

export default function SRegistro() {

    const { modal, handleClickModal } = useVesuvio();
    //console.log(modal);

    const nameRef = createRef();
    const emailRef = createRef();
    const numberRef = createRef;


    const [errores, setErrores] = useState([])
    const { registro } = useAuth({ middleware: 'guest', url: '/' })

    const handleSubmit = async e => {
        e.preventDefault();

        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            numberRef: numberRef.current.value
        }

        // let response = registro(datos, setErrores)
        registro(datos, setErrores)

        // if (response) {
        //     // mostrar el modal de exito
        // } else {
        //     // mostrar el modal de error
        // }
    }

    return (
        <>
            <h1 className="text-4xl font-black">Solicita crear tu Cuenta</h1>
            <p>Llenando el formulario</p>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}

                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="name"
                        >Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="name"
                            placeholder="Tu Nombre"
                            ref={nameRef}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="email"
                        >Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="email"
                            placeholder="Tu Email"
                            ref={emailRef}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="email"
                        >Número Celular:</label>
                        <input
                            type="number"
                            id="number"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="email"
                            placeholder="Tu Número Celular"
                            ref={numberRef}
                        />
                    </div>

                    {/* <input
                        type="submit"
                        value=" Solicitar Crear Cuenta"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    /> */}

                    {<input
                        type="submit"
                        value=" Solicitar Crear Cuenta "
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    /> && (
                            <button
                                type="button"
                                className="bg-indigo-600 hover:bg-indigo-800
                        text-white w-full mt-5 p-3 uppercase font-bold"
                                onClick={() => {
                                    handleClickModal();
                                }}
                            >
                                {<Modal isOpen={modal} style={customStyles}>
                                    <h1 className='text-3xl font-bold mt-5'>
                                        {"Tus datos estan siendo validados,espera un correo con tus credenciales de acceso"}
                                    </h1>
                                    <nav className="mt-5 bg-red-500 hover:bg-indigo-80 px-5 py-2 
                        mt-5 text-white text-center uppercase rounded-lg font-bold">
                                        <Link to="/auth/login">
                                            Salir
                                        </Link>
                                    </nav>
                                </Modal>}
                                Solicitar Crear Cuenta
                            </button>
                        )}

                </form>
            </div>

            <nav className="mt-5">
                <Link to="/auth/login">
                    ¿Ya tienes cuenta? Inicia Sesión
                </Link>
            </nav>


            {/* {modal && (
                <Modal isOpen={modal} style={customStyles}> 
                    <p>
                        desde mdoal
                    </p>
                </Modal>
            )} */}
        </>
    )
}