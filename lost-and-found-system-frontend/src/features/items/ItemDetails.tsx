import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getItem } from "../../api/itemsService";
import type { Item } from "../../utils/types";

export default function ItemDetails(){
    const { id } = useParams()
    const [item, setItem] = useState<Item | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{if (id) fetchItem(id) }, [id])

    async function fetchItem(i: string){
        setLoading(true)
        try {
            const data = await getItem(i)
            setItem(data)
        } catch (error) { alert('Failed') } finally { setLoading(false) }
    }

    if (loading) return <div>Loading...</div>
    if (!item) return <div>Not Found</div>

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold">{item.itemName}</h2>
            <p className="mt-2">{item.description}</p>
            <p className="mt-2 text-sm">itemStatus: {item.itemStatus}</p>
            <p className="mt-2 text-sm">Category: {item.category}</p>
            <div className="mt-4">
                <Link to="/items" className="px-3 py-1 border rounded">Back</Link>
            </div>
        </div>
    )
}