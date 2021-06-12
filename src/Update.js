import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router'

export const Update = () => {
    const [name, setName] = useState("")
    const [roll, setRoll] = useState("")
    const [city, setCity] = useState("")

    const history = useHistory();
    const { id } = useParams();

    const loadProducts = async () => {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/${id}/`)
        console.log(data)
        setName(data.name)
        setRoll(data.roll)
        setCity(data.city)
    }

    const handleUpdate = async () => {
        let formField = new FormData()
        formField.append('name', name)
        formField.append('roll', roll)
        formField.append('city', city)

        await axios({
            method: 'PUT',
            url:`http://127.0.0.1:8000/api/${id}/`,
            data: formField
        }).then(response => {
            console.log(response.data)
            history.push('/')
        })
    }

    useEffect(() => {
        loadProducts();
    }, [])

    return (
        <div>
            <h2>Update Data</h2>
            <form onSubmit={handleUpdate}>
                <label>
                    Name:
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </label> <br />
                <label>
                    Roll:
                    <input type="number" name="roll" value={roll} onChange={(e) => setRoll(e.target.value)} />
                </label> <br />
                <label>
                    City:
                    <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
                </label> <br />
                <input type="submit" value="Update" />
            </form>
        </div>
    )
}