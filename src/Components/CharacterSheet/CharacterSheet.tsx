import React from "react";
import { useRef, useState } from "react";
import { Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { getToken, getUsername } from "../../Services/authentication";
import Items from '../Item/Item';

interface ParamTypes {
    cmid: string

}
export default function CharacterSheet(props: { history: string[]; }) {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [serverErrors, setServerErrors] = useState<Array<string>>([]);
    let {cmid} = useParams<ParamTypes>();
    let inventoryList: any = [];
    const formData = new FormData();
    const token = getToken();

    const addInventoryList = (item: any) => {
        inventoryList.push(item)
    }

    function handleChange(e: any) {
        let file = e.target.files[0];
        formData.append("characterSheet", file)
    }

    async function handleSubmit() {
            setSubmitting(true);
            setServerErrors([]);
            const response = await fetch("/api/create-charactersheet", {
                method: "POST",
                headers: {
                    "x-Access-Token": `${token}`
                },
                body: formData
    
            });
            const res = await response.json();
            if (res['status'] == "Success") {
                let body = {
                    csid: res['csid'],
                    cmid: parseInt(cmid),
                    inventoryList: inventoryList
                }
                let req = {
                    method: "POST",
                    headers: {'Content-Type':'application/json',
                        "x-Access-Token": `${token}`},
                    body: JSON.stringify(body)
                }
                const character_response = await fetch("/api/create-character", req);
                const character_res = await character_response.json();
                if(character_res['status'] == 'Success'){
                    window.location.href='/joinGame';
                }
            }
            else {
                setServerErrors([res['error']]);
            }
    
    
    
            setSubmitting(false);
    }

    return (
        <div className="d-flex justify-content-center">
            <Card>
                <Card.Body>
                    <h3>Character inventory: </h3>
                    <Items addInventoryList={addInventoryList}></Items>
                </Card.Body>
            </Card>
            <div>
            {serverErrors ? (
                    <ul>
                        {serverErrors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                ) : null}
                <div>
                    <Card bg='info'>
                        <Card.Body>
                            <div>
                                <h3>Upload character sheet: </h3>
                                <input onChange= {handleChange} type="file" name="file" />
                            </div>
                        </Card.Body>
                    </Card>
                    <div>
                        <button type="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>


            </div>
        </div>
    )

}