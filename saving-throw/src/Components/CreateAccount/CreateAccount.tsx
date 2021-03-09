import {useRef, useState} from "react";
import {useForm} from "react-hook-form";
//import ReCAPTCHA from "react-google-recaptcha";


interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;

}
export default function CreateAccount(){
    const {register, handleSubmit, errors,} = useForm<FormData>({
        defaultValues:{
            first_name: "Bob",
            last_name: "Bobson",
            email: "robert@email.com",
            password: "R0b#rt123",
        }
    });
    const [submitting, setSubmitting] = useState<boolean>(false);

    return <form onSubmit={handleSubmit(async(formData)=>{
            setSubmitting(true);
            
            // if(submitting){
            //     return false
            // }
            console.log(formData, "formData");
            
            const response = await fetch("/create-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: 'cors',
                body: JSON.stringify({
                    //formData
                    // if want to uses token(watch video)
                    firstName: formData.first_name,
                    lastName: formData.last_name,
                    email: formData.email,
                    password: formData.password,
                })
            });
            const data = await response.json();

            setSubmitting(false);
        })}>
        <div>
            <label htmlFor="name"> First Name</label>
            <input 
                type="text" 
                name="first_name" 
                id="first_name" 
                ref={register({
                    required: {
                        value: true,
                        message: "Type your first name."
                    }
                    
                })} 
            />
            {errors.first_name ? <div>{errors.first_name.message} </div> : null}
        </div>
        <div>
            <label htmlFor="name"> Last Name</label>
            <input 
                type="text" 
                name="last_name" 
                id="last_name" 
                ref={register({required: "required"})} 
            />
             {errors.last_name ? <div>{errors.last_name.message} </div>: null}
        </div>
        <div>
            <label htmlFor="email"> Email</label>
            <input 
                type="email" 
                name="email" 
                id="email" 
                ref={register({required: {
                    value: true,
                    message: "Please enter valid email."
                }})} 
            />
             {errors.email ? <div>{errors.email.message} </div>: null}
        </div>
        <div>
            <label htmlFor="password"> Password</label>
            <input 
                type="password" 
                name="password" 
                id="password" 
                ref={register({
                    required: "required",
                    minLength: {
                        value: 8,
                        message: "Must be 8 characters long.",
                    },
                    validate: (value) => {
                        return [
                            /[a-z]/,
                            /[A-Z]/,
                            /[0-9]/,
                            /[^a-zA-Z0-9]/,
                        ].every((pattern) => 
                        pattern.test(value)) 
                        || "Must contain lower, upper number, and special character";
                    },
                })} 
            />
             {errors.password ? <div>{errors.password.message} </div>: null}
        </div>
        <div>
            <button type="submit" disabled = {submitting}> Create Account</button>
        </div>
    </form>;
}