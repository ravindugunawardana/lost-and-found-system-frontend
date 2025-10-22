import api from './axios'
import { setToken } from '../auth/tokenService'

export async function loginApi(payload: { username: string, password: string }){
const { data } = await api.post('/auth/login', payload)
if(data?.accessToken) setToken(data.accessToken)
return data
}

export async function signupApi(payload: any){
    const { data } = await api.post('/auth/signup', payload)
    return data
}
