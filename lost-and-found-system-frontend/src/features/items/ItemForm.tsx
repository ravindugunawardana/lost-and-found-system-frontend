import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createItem, getItem, updateItem } from "../../api/itemsService";

type Form = {
    itemName: string
    description: string
    itemStatus: 'lost' | 'found'
    category?: string
}

export default function ItemForm(){
    const { register, handleSubmit, setValue } = useForm<Form>()
    const nav = useNavigate()
    const { id } = useParams()
    const [preview, setPreview] = useState<string | null>(null)

    useEffect(()=>{
        if (id) load()
    }, [id])

    async function load(){
        try {
            const data = await getItem(id!)
            setValue('itemName', data.itemName)
            setValue('description', data.description)
            setValue('itemStatus', data.itemStatus)
            setValue('category', data.category)
        } catch (e: any) {
            alert('Failed to load')
        }
    }

    const onSubmit = async (vals: Form) => {
        try {
            const form = new FormData()
            form.append('itemName', vals.itemName)
            form.append('description', vals.description)
            form.append('itemStatus', vals.itemStatus)
    
        if (id) await updateItem(id, form)
        else await createItem(form)
        nav('/items')
        } catch (e:any) { alert('Save failed')}
    }


        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const f = e.target.files?.[0]
            if (f) setPreview(URL.createObjectURL(f))
        }

        return (
            <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
                <h2 className="text=xl font-semiblod mb-4">{id ? 'Edit' : 'Create'} Item</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>
                        <label className="block text-sm">Item Name</label>
                        <input {...register('itemName', {required: true})} className="w-full p-2 border rounded" />
                    </div>

                    <div>
                        <label className="block text-sm">Description</label>
                        <textarea {...register('description', {required: true })} className="w-full p-2 border rounded" />
                    </div>

                    <div>
                        <label className="block text-sm">Item Status</label>
                        <select {...register('itemStatus')} className="w-full p-2 border rounded">
                            <option value={"lost"}>Lost</option>
                            <option value={"found"}>Found</option>
                        </select>
                    </div>

                    <div>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                    </div>

                </form>
            </div>
        )

    }