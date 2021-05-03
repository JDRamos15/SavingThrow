import {useState} from "react";
import {useForm} from "react-hook-form";
//import ReCAPTCHA from "react-google-recaptcha";
import "./JoinGame.css";
import { useHistory } from "react-router-dom";
import {getToken, login} from "../../Services/authentication";




interface FormData {
    room: number;
    password: string;

}
export default function JoinGame(props: { history: string[]; }){
    const {register, handleSubmit, errors,} = useForm<FormData>({
        defaultValues:{

            password: "enter",
        }
    });
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [serverErrors, setServerErrors] = useState<Array<string>>([]);
    const token = getToken();

    return <form onSubmit={handleSubmit(async(formData)=>{
            setSubmitting(true);
            setServerErrors([]);
            // if(submitting){
            //     return false
            // }
            console.log(formData, "formData");
            
            const response = await fetch("api/join-room", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-Access-Token" : `${token}`
                },
                body: JSON.stringify({
                    room: formData.room,
                    password: formData.password,
                })
            });
            const data = await response.json();
            console.log(data, "join")
            if (data['status'] == "Success"){
                window.location.href="/gamePage/room="+data['room']+"&code="+data['password']
            }
            else
                setServerErrors([data['error']]);
       

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
            <label htmlFor="name">Room Number</label>
            <input 
                type="text" 
                name="room" 
                id="room" 
                ref={register({
                    required: {
                        value: true,
                        message: "Type in room number."
                    }
                    
                })} 
            />
            {errors.room ? <div>{errors.room.message} </div> : null}
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                name="password" 
                id="password" 
                ref={register({
                    required: "required",
                    minLength: {
                        value: 4,
                        message: "Must be 4 characters long.",
                    },
                })} 
            />
             {errors.password ? <div>{errors.password.message} </div>: null}
        </div>
        <div>
            <button type="submit" disabled = {submitting}> Join</button>
        </div>
    </form>;
}