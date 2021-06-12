import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from 'react'

export const  Detail = () => {
    const [product, setProduct] = useState("")
    const { id } = useParams();
    const getSingleProduct = async () => {
        const {data} = await axios.get(`http://127.0.0.1:8000/api/${id}/`)
        console.log(data)
        setProduct(data)
    }
    useEffect(() => {
        getSingleProduct();
    }, [])
        return (
            <div>
                <h2>Details</h2>
                {/* <ul>{this.state.courses.map(course => <li key={course.id}>{course.name}</li>)}</ul> */}
                <p>{id}</p>
                <p>{product.name}</p>
                <p>{product.roll}</p>
                <p>{product.city}</p>
                <Link to="/"><button>Home</button></Link>
                <Link to={`/${product.id}/update/`}><button>Update</button></Link>
            </div>
        )
    
}