import React from "react"
import './datatable.css'
export default function Datatable({ data, addList } : any){


    const columns = [ "name", "effect", "description", "damage"]

    return(
        <table className="table-border" cellPadding={1} cellSpacing={1}> 
            <thead className="table-border">
                {/* Display headers */}
                <tr >{data[0] && columns.map((heading : any) => <th className="table-border">{heading}</th>)}</tr>
            </thead>
            <tbody className="table-border">
                {/* Iterate over data and dislpay each row */}
                {data.map((row : any) => 
                    <tr onClick= {() => addList(row)} className="table-border">
                        {columns.map((column : any) => 
                            <td className="table-border">{row[column]}</td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    );
}