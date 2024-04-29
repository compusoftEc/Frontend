import { useEffect } from 'react'
import useSWR from 'swr'
import { useNavigate } from 'react-router-dom'
import clienteAxios from "../config/axios";

export const useAuth = ({ middleware, url }) => {

    const token = localStorage.getItem('AUTH_TOKEN')
    // consst[token, setToken] = useState('');
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
            await mutate()// revalida el codigo en busca de cambios 
            //console.log('token: ', data)
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
            // return true;
        } catch (error) {
            setErrores(Object.values(error.response.data.errors))
            // return false;
        }

    }

    const Sregistro = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/Sregistro', datos)
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([])
            await mutate()
        } catch (error) {
            setErrores(Object.values(error?.response?.data?.errors))
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
            // console.log('if1')
            // console.log('middleware: ', middleware)
            // console.log('user: ', user)
            navigate(url, { token: token })
        }

        if (middleware === 'guest' && user && user.admin) {
            // console.log('if2')
            // console.log('middleware: ', middleware)
            // console.log('user: ', user)
            navigate('/admin');
        }

        if (middleware === 'admin' && user && !user.admin) {
            // console.log('if3')
            // console.log('middleware: ', middleware)
            // console.log('user: ', user)
            navigate('/',)
        }

        if (middleware === 'auth' && error) {
            // console.log('if4')
            // console.log('middleware: ', middleware)
            // console.log('user: ', user)
            navigate('/auth/login')
        }
    }, [user, error])

    return {
        login,
        registro,
        Sregistro,
        logout,
        user,
        error
    }

}
