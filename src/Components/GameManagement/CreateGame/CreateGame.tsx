import { Switch } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
//import ReCAPTCHA from "react-google-recaptcha";
import "./CreateGame.css";


interface FormData {
    name: string;
    description: string;
    start_date: string;
    password: string;
    capacity: number;
}
export default function CreateGame() {
    const { register, handleSubmit, errors, } = useForm<FormData>({
    });
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [serverErrors, setServerErrors] = useState<Array<string>>([]);
    function togglSwitch() { setIsEnabled(previousState => !previousState); };

    return <form onSubmit={handleSubmit(async (formData) => {
        setSubmitting(true);
        setServerErrors([]);
        // const body = JSON.stringify({
        //     name: formData.name,
        //     description: formData.description,
        //     dm_uid: 1,
        //     looking_for: isEnabled,
        //     start_date: formData.start_date,
        //     password: formData.password,
        //     capacity: formData.capacity
        // })
        const response = await fetch("/api/create-game", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                description: formData.description,
                dm_uid: 1,
                looking_for: isEnabled,
                start_date: formData.start_date,
                password: formData.password,
                capacity: formData.capacity
            })
        });
        const data = await response.json();
        if (data[1] = 201)
            console.log(data[0], ":Server Data");
        else
            console.log("Wrong");


        setSubmitting(false);
    })}>
        <div>
            <label htmlFor="name">Campaign Name</label>
            <input
                type="text"
                name="name"
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
                ref={register({
                    required: {
                        value: false,
                        message: "Please enter your campaign description"
                    }
                })}
            />
        </div>
        <div>
            <label htmlFor="looking_for">Looking for new players?</label>
            <Switch
                onChange={togglSwitch}
                value={isEnabled}
            />
        </div>
        <div>
            <label htmlFor="password">Access code? (12 characters max)</label>
            <input
                type="text"
                name="password"
                id="password"
                ref={register({
                    required: {
                        value: false,
                        message: "Please enter your campaign access code"
                    }
                })}
            />
        </div>
        <div>
            <label htmlFor="capacity">How many players? (8 players max)</label>
            <input
                type="number"
                name="capacity"
                id="capacity"
                ref={register({
                    required: {
                        value: true,
                        message: "Please enter your campaign capacity"
                    }
                })}
            />
            {errors.description ? <div>{errors.description.message} </div> : null}
        </div>
        <div>
            <label htmlFor="date">Campaign start date</label>
            <input
                type="date"
                name="start_date"
                id="start_date"
                ref={register({
                    required: {
                        value: true,
                        message: "Please enter your campaign start date"
                    }
                })}
            />
            {errors.start_date ? <div>{errors.start_date.message} </div> : null}
        </div>
        <div>
            <button type="submit" > Create Game</button>
        </div>
    </form>;
}