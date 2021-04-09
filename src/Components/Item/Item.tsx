import React, {useState, useEffect} from 'react'


export default function Items(){
    // Store data. Returns a tuble: (Get, Set}
    const [data, setData] = useState([])
    // Query filter
    const [q, setQ] = useState("")
    const [searchColumns, setSearchColumns] = useState(["name", "effect"])

    // Load data into useState()
    useEffect(() => {
        fetch('api/itemSearch')
        .then((response) => response.json())
        .then((json) => setData(json));
    }, []);


    function search(rows: any[]){
        return rows.filter(
            // some returns the value that matches any of the expressions
            (row) => 
            searchColumns.some((column) => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1)
        );
    }

    // data[0] in case there are no rows
    // Object.keys pulls out all keys of the json
    const columns = data && Object.keys(data);
    const columns_headers = Object.keys(data[0]);


    return (
        <div>
            {/* Filter */}
            <div> 
                {/* e -> event that happens every time a char is input
                e.target.value -> text in textbox */}
                <input type="text" value={q} onChange={(e) => setQ(e.target.value)}/>
                {
                    // Check columns filter
                    columns && columns.map(column => <label>
                        {/* Checkbox */}
                        <input type="checkbox" checked={searchColumns.includes(column)}
                        // Changed check
                        onChange={(e) => {
                            const checked = searchColumns.includes(column)
                            setSearchColumns(prev => checked
                                ? prev.filter(sc => sc !== column)
                                : [...prev, column])
                        }}/>
                    {column}</label>)
                }
            </div>

                {/* Data table */}
            <div>
                <table cellPadding={0} cellSpacing={0}> 
                    <thead>
                        {/* Display headers */}
                        <tr>{data[0] && columns_headers.map((heading) => <th>{heading}</th>)}</tr>
                    </thead>

                    <tbody>
                        {/* Iterate over data and dislpay each row */}
                        {data.map((row) => (
                            <tr>
                                {columns.map((column) => (
                                    <td>{row[column]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}