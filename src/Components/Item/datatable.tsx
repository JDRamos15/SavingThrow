import React from "react"

export default function Datatable({ data } : any){

    const columns = data[0] && Object.keys(data[0]);

    return(
        <table cellPadding={1} cellSpacing={1}> 
            <thead>
                {/* Display headers */}
                <tr>{data[0] && columns.map((heading : any) => <th>{heading}</th>)}</tr>
            </thead>

            <tbody>
                {/* Iterate over data and dislpay each row */}
                {data.map((row : any) => 
                    <tr>
                        {columns.map((column : any) => 
                            <td>{row[column]}</td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    );
}