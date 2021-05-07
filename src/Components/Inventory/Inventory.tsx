import React from "react"
import './Inventory.css'
export default function Inventory({ data, removeList, setUpdated } : any){


    const columns = [ "name", "effect", "description", "damage"]
    console.log(data)

    function updateList(row : any){
        removeList(row)
        setUpdated(false)
    }

    
    return(
        <table className="table-border" cellPadding={1} cellSpacing={1}> 
            <thead className="table-border">
                {/* Display headers */}
                <tr >{columns.map((heading : any) => <th className="table-border">{heading}</th>)}</tr>
            </thead>
            <tbody className="table-border">
                {/* Iterate over data and dislpay each row */}
                {data.map((row : any) => 
                    <tr onClick= {() => updateList(row)} className="table-border">
                        {columns.map((column : any) => 
                            <td className="table-border">{row[column]}</td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    );
}