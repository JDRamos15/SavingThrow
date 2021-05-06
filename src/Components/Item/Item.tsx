import { render } from '@testing-library/react'
import React, {useState, useEffect} from 'react'
import Datatable from "./datatable"
import Loader from "react-loader-spinner"


export default function Items({addInventoryList}: any){
    // Store data. Returns a tuble: (Get, Set}
    
    const [data, setData] = useState([])
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // Query filter
    const [q, setQ] = useState("")
    const [searchColumns, setSearchColumns] = useState(["name", "effect"])
    // Columns hardcoded
    const [columns, setColumns] = useState(["name", "effect", "description", "damage"])

    // // Load data into useState()
    useEffect(() => {
        fetch('/api/itemSearch')
        .then((response) => response.json())
        .then((json) => setData(json));
        setIsLoading(false)
    }, []);

    const addList  = (item: any) => {
        addInventoryList(item)
    }

    function search(rows: any[]){
        return rows.filter(
            (row) => 
            searchColumns.some((column) => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1)
        );
    }

    if(isLoading){
        console.log("inside loading")

        return(
            <Loader 
            type="Circles"
            color="#00BFFF"
            height={60}
            width={80}/>
        )
        
    }
    else{
        return (
            <div >
                {/* Filter */}
                <div> 
                    {/* e -> event that happens every time a char is input
                    e.target.value -> text in textbox */}
                    <input type="text" value={q} onChange={(e) => setQ(e.target.value)}/>
                    {
                        // Check columns filter
                        columns && columns.map((column : any) => <label>
                            {/* Checkbox */} 
                            <input type="checkbox" checked={searchColumns.includes(column)}
                            // Changed check
                            onChange={(e) => {
                                const checked = searchColumns.includes(column)
                                setSearchColumns(prev => checked
                                    ? prev.filter(sc => sc !== column)
                                    : [...prev, column])
                            }}/>
                        {column}</label>)}
                </div>
    
                    {/* Data table */}
                <div>
                    <Datatable 
                    data = {search(data)}
                    addList = {addList}
                    />
                </div>
            </div>
        )
    }

}