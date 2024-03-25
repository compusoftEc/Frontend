import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import AuthLayout from './layouts/AuthLayout'
import Layout from './layouts/Layout'
import HomeLayout from './layouts/HomeLayout'
import Login from './views/Login'
import Homepage from './views/Homepage'
import Ordenes from './views/Ordenes'
import Productos from './views/Productos'
import Registro from './views/Registro'
import Inicio from './views/Inicio'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Inicio />
            }
        ]
    },
    {
        path: '/homepage',
        element: <HomeLayout />,
        children: [
            {
                index: true,
                element: <Homepage />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/registro',
                element: <Registro />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Ordenes />
            },
            {
                path: '/admin/productos',
                element: <Productos />
            }
        ]
    }
])

export default router