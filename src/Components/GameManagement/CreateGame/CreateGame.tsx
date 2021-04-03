import {useState} from "react";
import {useForm} from "react-hook-form";
//import ReCAPTCHA from "react-google-recaptcha";
import "./CreateGame.css";


interface FormData {
    name: string;
    description: string;
    start_date: string;
}
export default function CreateGame(){
    const {register, handleSubmit, errors,} = useForm<FormData>({
    });
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [serverErrors, setServerErrors] = useState<Array<string>>([]);
    return <form onSubmit={handleSubmit(async(formData)=>{
            setSubmitting(true);
            setServerErrors([]);
            
            const response = await fetch("/api/create-game", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    //formData
                    // if want to uses token(watch video)
                    name: formData.name,
                    description: formData.description,
                    start_date: formData.start_date
                })
            });
            const data = await response.json();
            if (data[1] = 201)
                console.log(data[0], ":Server Data");
            else
                console.log("Wrong");
            // if (data.errors){
            //     setServerErrors(data.errors);

            // }else{
            //     console.log('success');
            // }

            

            setSubmitting(false);
        })}>
        <div>
            <label htmlFor="name">Campaign Name</label>
            <input 
                type="text" 
                name="Name" 
                id="name" 
                ref={register({
                    required: {
                        value: true,
                        message: "Type the name of the campaign"
                    }
                    
                })} 
            />
            {errors.name ? <div>{errors.name.message} </div> : null}
        </div>
        <div>
            <label htmlFor="description">Description</label>
            <input 
                type="text" 
                name="description" 
                id="description" 
                ref={register({required: {
                    value: true,
                    message: "Please enter your campaign description"
                }})} 
            />
             {errors.description ? <div>{errors.description.message} </div>: null}
        </div>
        <div>
            <label htmlFor="date">Campaign start date</label>
            <input 
                type="date" 
                name="start_date" 
                id="start_date" 
                ref={register({required: {
                    value: true,
                    message: "Please enter your campaign start date"
                }})} 
            />
             {errors.start_date ? <div>{errors.start_date.message} </div>: null}
        </div>
        <div>
            <button type="submit" disabled = {submitting}> Create Game</button>
        </div>
    </form>;
}