import { useEffect } from 'react'
import useSWR from 'swr'
import { useNavigate } from 'react-router-dom'
import clienteAxios from "../config/axios";

export const useAuth = ({ middleware, url }) => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate();

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .catch(error => {
                throw Error(error?.response?.data?.errors) //opcional chaining
            })
    )

    const login = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/login', datos)
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([])
            await mutate()// revalida el codigo enbusca de cambios 
        } catch (error) {
            setErrores(Object.values(error.response.data.errors))
        }
    }

    const registro = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/registro', datos)
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([])
            await mutate()
        } catch (error) {
            setErrores(Object.values(error.response.data.errors))
        }
    }

    const Sregistro = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/Sregistro', datos)
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([])
            await mutate()
        } catch (error) {
            setErrores(Object.values(error.response.data.errors))
        }
    }


    const logout = async () => {
        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)
            return navigate('/auth/login')
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }

    useEffect(() => {
        if (middleware === 'guest' && url && user) {
            navigate(url)
        }

        if (middleware === 'guest' && user && user.admin) {
            navigate('/admin');
        }

        if (middleware === 'admin' && user && !user.admin) {
            navigate('/')
        }

        if (middleware === 'auth' && error) {
            navigate('/auth/login')
        }
    }, [user, error])
    // console.log(user)
    // console.log(error)
    // console.log(middleware)
    return {
        login,
        registro,
        Sregistro,
        logout,
        user,
        error
    }

}