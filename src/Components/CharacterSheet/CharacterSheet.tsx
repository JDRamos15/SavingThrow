import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { isPropertySignature } from "typescript";
import { login } from "../../Services/authentication";
import { useHistory } from "react-router-dom";

export default function CharacterSheet
    (props: { history: string[]; }) {
    const { register, handleSubmit, errors, } = useForm();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [serverErrors, setServerErrors] = useState<Array<string>>([]);

    return <form onSubmit={handleSubmit(async (data) => {
        setSubmitting(true);
        setServerErrors([]);
        const formData = new FormData();
        formData.append("characterSheet", data.file[0])
        const response = await fetch("/api/create-charactersheet", {
            method: "POST",
            body: formData
    });
        const res = await response.json();
        if (res['status'] == "Success") {
            console.log(data[0], ":Server Data");
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
        </div>
    </form>;

}