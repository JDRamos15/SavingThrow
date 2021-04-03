import {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import { isPropertySignature } from "typescript";


interface FormData {
    username: string;
    password: string;

}
export default function Login(props: { history: string[]; }){
    const {register, handleSubmit, errors,} = useForm<FormData>({
        defaultValues:{
            username: "bobyWillRockU",
            password: "R0b#rt123",
        }
    });
    const [submitting, setSubmitting] = useState<boolean>(false);

    return <form onSubmit={handleSubmit(async(formData)=>{
            setSubmitting(true);
            
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
            console.log(data)
            // if (data[1] != 200){
            //     console.log("Login Unsuccesful")
            //     return;
            // }
            // else{
            //     props.history.push('/profile');
            // }
            

            setSubmitting(false);
        })}>
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