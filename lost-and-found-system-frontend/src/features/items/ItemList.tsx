import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { getItems, deleteItem } from '../../api/itemsService'
import type { Item } from "../../utils/types";

export default function ItemList(){
    const [items, setItems] = useState<Item[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{ fetchItems() }, [])

    async function fetchItems(){
        setLoading(true)
        try {
            const data = await getItems()
            setItems(data)
        } catch (e: any) {
            alert('Failed to fetch')
        } finally { setLoading(false) }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete item?')) return
        try {
            await deleteItem(id)
            setItems(prev => prev.filter(i => i.id !== id))
        } catch (e: any) { alert('Delete Failed') }
    }

    return(
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Items</h2>
                <Link to="/create" className="px-3 py-1 bg-green-600 text-white rounded">Report Item</Link>
            </div>
            {loading ? <div>Loading...</div> : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map(it => (
                        <div key={it.id} className="bg-white p-4 rounded shadow">
                            <h3 className="font-semibold">{it.itemName}</h3>
                            <p className="text-sm">{it.description}</p>
                            <div className="mt-2 flex gap-2">
                                <Link to={'/items/${it.id}'} className="text-sm px-2 py-1 border rounded">View</Link>
                                <Link to={'/edit/${it.id'} className="text-sm px-2 py-1 border rounded">Edit</Link>
                                <button onClick={() => handleDelete(it.id)} className="text-sm px-2 py-1 border rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}