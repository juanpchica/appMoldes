import React from 'react'
import { useParams } from "react-router-dom";

export const Molde = () => {
const { id } = useParams();
console.log(id);
    return (
        <div>
            works
        </div>
    )
}
