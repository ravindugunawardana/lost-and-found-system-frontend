import api from './axios'
import type { Item } from '../utils/types'


export const getItems = async () => {
    const { data } = await api.get<Item[]>('/items')
    return data
}

export const getItem = async (id: string) => {
    const { data } = await api.get<Item>('/items/${id}')
    return data
}

export const createItem = async (payload: FormData) => {
    const { data } = await api.post('/items', payload, { headers: { 'Content-Type': 'multipart/form-data' } })
    return data
}

export const updateItem = async (id: string, payload: FormData) => {
    const { data } = await api.put('/items/${id}', payload, { headers: {'Content-Type': 'multipart/form-data' } })
    return data
}

export const deleteItem = async (id: string) => {
    const { data } = await api.delete('/items/${id}')
    return data
}