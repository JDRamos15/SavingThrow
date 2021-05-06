import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { getToken } from "../../Services/authentication";
import Items from '../Item/Item';

export default function CharacterSheet(props: { history: string[]; }) {
    const { register, handleSubmit, errors, } = useForm();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [serverErrors, setServerErrors] = useState<Array<string>>([]);
    let inventoryList: any = [];

    const addInventoryList = (item: any) => {
        inventoryList.push(item)
    }

    return <form onSubmit={handleSubmit(async (data) => {
        setSubmitting(true);
        setServerErrors([]);
        const formData = new FormData();
        const token = getToken();
        formData.append("characterSheet", data.file[0])
        console.log(formData)
        const response = await fetch("/api/create-charactersheet", {
            method: "POST",
            headers: {
                "x-Access-Token" : `${token}`
            },
            body: formData
            
        });
        const res = await response.json();
        if(res['status'] == "Token is invalid!"){
            window.location.href='/'
        }
        if (res['status'] == "Success") {
            console.log("Success!")
            // let body = {
            //     csid: res['csid'],
            //     inventoryList: inventoryList
            // }
            // let req = {
            //     method: "POST",
            //     headers: {'Content-Type':'application/json'},
            //     body: JSON.stringify(body)
            // }
            // console.log(req)
            // const response = await fetch("/api/create-character", req);
        }
        else {
            setServerErrors([res['error']]);
        }



        setSubmitting(false);
    })}>
        {serverErrors ? (
            <ul>
                {serverErrors.map((error) => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
        ) : null}
        <div>
            <input ref={register} type="file"
                name="file" />
            <button type="submit" > Submit file</button>
            <Items addInventoryList={addInventoryList}></Items>
        </div>
    </form>;

}