import { Outlet } from 'react-router-dom'
import Modal from 'react-modal'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Sidebar from '../components/Sidebar'
import Resumen from '../components/Resumen'
import ModalProducto from '../components/ModalProducto'
import useVesuvio from '../hooks/useVesuvio'
import { useAuth } from '../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Inicio from '../views/Inicio';

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

Modal.setAppElement('#root')

export default function Layout() {
    useAuth({ middleware: 'auth' });
    const { modal } = useVesuvio();

    const location = useLocation();
    const { token } = location.state || { token: null };
    const [categoriaId, setCategoriaId] = useState(1);

    return (
        <>
            <div className='md:flex'>
                {/* <p>esta es la vista del cliente</p> */}
                <Sidebar
                    token={token}
                    setCategoriaId={setCategoriaId}
                />

                <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-2'>


                <Inicio
                    token={token}
                    categoriaId={categoriaId}
                />


                    {/* <Outlet
                        categoriaId={categoriaId}
                    /> */}
                </main>

                <Resumen
                    token={token}
                />
            </div>

            <Modal isOpen={modal} style={customStyles}>
                <ModalProducto />
            </Modal>

            <ToastContainer />
        </>
    )
}
