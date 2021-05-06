import {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import { isPropertySignature } from "typescript";
import {login} from "../../Services/authentication";
import { useHistory } from "react-router-dom";
import {isLogged,getPublicId,getUsername, logout} from "../../Services/authentication";



interface FormData {
    username: string;
    password: string;

}
export default function Login(props: { history: string[]; }){
    const {register, handleSubmit, errors,} = useForm<FormData>({});
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [serverErrors, setServerErrors] = useState<Array<string>>([]);
    return <form onSubmit={handleSubmit(async(formData)=>{
            setSubmitting(true);
            setServerErrors([]);
            console.log(formData, "formData");
            
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                })
            });
            const data = await response.json();
            if (data['status'] == "Success"){
                console.log(data)
                console.log(data['token'])
                login(data['loggedIn'], data['token'], data['username'], data['public_id'], data['fname'])
                // props.history.push('/profile/'+data['username']);
                window.location.href='/profile/'+data['username']
            }
            else{
                setServerErrors([data['error']]);
            }
            // if (data[1] != 200){
            //     console.log("Login Unsuccesful")
            //     return;
            // }
            // else{
            //     props.history.push('/profile');
            // }
            

            setSubmitting(false);
        })}>
            {serverErrors ? (
            <ul>
                {serverErrors.map((error) => ( 
                <li key={error}>{error}</li>
                ))}
            </ul>
           ): null }

        <div>
            <label htmlFor="username"> Username</label>
            <input 
                type="username" 
                name="username" 
                id="username" 
                ref={register({required: {
                    value: true,
                    message: "Please enter valid username."
                }})} 
            />
             {errors.username ? <div>{errors.username.message} </div>: null}
        </div>
        <div>
            <label htmlFor="password"> Password</label>
            <input 
                type="password" 
                name="password" 
                id="password" 
                ref={register({required: "required"})} 
            />
             {errors.password ? <div>{errors.password.message} </div>: null}
        </div>
        <div>
            <button type="submit" disabled = {submitting}> Login </button>
        </div>
    </form>;
}