import { formatearDinero } from "../helpers";
import useVesuvio from "../hooks/useVesuvio";
import { useAuth } from "../hooks/useAuth";
import ResumenProducto from "./ResumenProducto";
import React, { useState } from 'react';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

// function App() {
//     const [selectedOption, setSelectedOption] = useState('');

//     const handleOptionChange = (option) => {
//       setSelectedOption(option);
//     };

export default function Resumen() {
    const { pedido, total, handleSubmitNuevaOrden } = useVesuvio();
    const { logout } = useAuth({})

    const comprobarPedido = () => pedido.length === 0;

    const handleSubmit = e => {
        e.preventDefault();
        handleSubmitNuevaOrden();
        // openModal();

    }

    const openModal = () => {
        // document.getElementById('modal').classList.remove('hidden')
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = React.useState('md')

    const sizes = ["2xl"];


    const handleOpen = (size) => {
        setSize(size)
        onOpen();
    }

    return (
        <aside className="w-72 h-screen overflow-y-scroll p-5">
            <div className="my-5 pxl-5 text-2xl">
                <button
                    type="button"
                    className="text-center bg-red-500 w-full p-2 font-bold text-white 
                    truncate"
                    onClick={logout}
                >
                    Salir
                </button>
            </div>
            <h1 className="text-4xl font-black">
                Mi Pedido
            </h1>
            <p className="text-lg my-5">
                Aquí podrás ver el resumen y totales de tu pedido
            </p>

            <div className="py-10">
                {pedido.length === 0 ? (
                    <p className="text-center text-2xl">
                        No hay elementos en tu pedido aún
                    </p>
                ) : (
                    //change for resolve error map
                    pedido?.map(producto => (
                        <ResumenProducto
                            key={producto.id}
                            producto={producto}
                        />
                    ))
                )}
            </div>

            <p className="text-xl mt-10">
                Total: {''}
                {formatearDinero(total)}
            </p>

            <div>
                <div>
                    <h1 className=" mt-3 text-3xl font-black">Forma de pago</h1>
                    <div className="text-xl mt-5">
                        <input
                            type="radio"
                            id="option1"
                            name="option"
                            value="option1"
                        //   checked={selectedOption === 'option1'}
                        //   onChange={() => handleOptionChange('option1')}
                        />
                        <label htmlFor="option1"> Efectivo</label>
                    </div>
                    <div className="text-xl mt-5">
                        <input
                            type="radio"
                            id="option2"
                            name="option"
                            value="option2"
                        //   checked={selectedOption === 'option2'}
                        //   onChange={() => handleOptionChange('option2')}
                        />
                        <label htmlFor="option2"> Transferencia</label>
                    </div>
                    <div className="text-xl mt-5">
                        <input
                            type="radio"
                            id="option3"
                            name="option"
                            value="option3"
                        //   checked={selectedOption === 'option3'}
                        //   onChange={() => handleOptionChange('option3')}
                        />
                        <label htmlFor="option3">Terjeta: </label>

                        <div className="flex flex-wrap gap-3">

                        </div>
                        {/*
                        <Modal
                            size={size}
                            isOpen={isOpen}
                            onClose={onClose}
                        >
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                                        <ModalBody>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                Nullam pulvinar risus non risus hendrerit venenatis.
                                                Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                            </p>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                Nullam pulvinar risus non risus hendrerit venenatis.
                                                Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                            </p>
                                            <p>
                                                Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                                dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                                Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                            </p>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Close
                                            </Button>
                                            <Button color="primary" onPress={onClose}>
                                                Action
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal> */}

                        {/* {selectedOption === 'option3' && (
          <div>
            {subOptions.map((subOption, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`subOption${index + 1}`}
                  name="subOption"
                  value={subOption}
                />
                <label htmlFor={`subOption${index + 1}`}>{subOption}</label>
              </div>
            ))}
          </div>
        )} */}

                        <label htmlFor="option4"> 3 Meses</label>
                        <label htmlFor="option5"> 6 Meses</label>
                        <p className="text-xl mt-10">
                            Cuotas desde: {''}
                            {formatearDinero((total + (total * 0.15)) / 6)}
                        </p>
                    </div>
                </div>
            </div>

            <form
                className="w-full"
                onSubmit={handleSubmit}
            >
                <div className="mt-5">
                    <input
                        type="submit"
                        className={`${comprobarPedido() ?
                            'bg-indigo-100' :
                            'bg-green-600 hover:bg-green-800'} 
                            px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer`}
                        value="Confirmar Pedido"

                        disabled={comprobarPedido()}

                    />
                </div>
            </form>
        </aside>
    )
}