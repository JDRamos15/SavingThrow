import { useState } from "react";
import { useForm } from "react-hook-form";
import "./CreateAccount.css";
import { useHistory } from "react-router-dom";
import { login } from "../../Services/authentication";
import React from "react";
import { Card } from "react-bootstrap";




interface FormData {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;

}
export default function CreateAccount(props: { history: string[]; }) {
    const { register, handleSubmit, errors, } = useForm<FormData>({});
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [serverErrors, setServerErrors] = useState<Array<string>>([]);
    return (
        <div className="d-flex justify-content-center ">
            <div >
                <Card bg='info' style={{ width: '20vw', height: '60vh', paddingTop: '3vh' }}>
                    <div className="d-flex justify-content-center">
                        <Card>
                            <Card.Body>
                                <form onSubmit={handleSubmit(async (formData) => {
                                    console.log(formData, "formData");

                                    const response = await fetch("api/create", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            firstName: formData.first_name,
                                            lastName: formData.last_name,
                                            username: formData.username,
                                            email: formData.email,
                                            password: formData.password,
                                        })
                                    });
                                    const data = await response.json();
                                    if (data == "Success") {
                                        const logInresponse = await fetch("api/login", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({
                                                username: formData.username,
                                                password: formData.password,
                                            })
                                        });
                                        const logIndata = await logInresponse.json();
                                        if (logIndata['status'] == "Success") {
                                            login(logIndata['loggedIn'], logIndata['token'], logIndata['username'], logIndata['public_id'], logIndata['fname'])
                                            window.location.href = '/profile/' + data['username']
                                        }
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
                                    ) : null}
                                    <h1>Create account</h1>
                                    <div>
                                        <label htmlFor="name">First Name</label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            id="first_name"
                                            ref={register({
                                                required: {
                                                    value: true,
                                                    message: "Type your first name."
                                                },
                                                validate: (value) => {
                                                    return [
                                                        /[a-z]/,
                                                        /[A-Z]/,
                                                    ].every((pattern) =>
                                                        pattern.test(value))
                                                        || "Must contain lower and upper character";
                                                },

                                            })}
                                        />
                                        {errors.first_name ? <div>{errors.first_name.message} </div> : null}
                                    </div>
                                    <div>
                                        <label htmlFor="name">Last Name</label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            id="last_name"
                                            ref={register({
                                                required: {
                                                    value: true,
                                                    message: "Type your last name."
                                                },
                                                validate: (value) => {
                                                    return [
                                                        /[a-z]/,
                                                        /[A-Z]/,
                                                    ].every((pattern) =>
                                                        pattern.test(value))
                                                        || "Must contain lower and upper character";
                                                },
                                            })}
                                        />
                                        {errors.last_name ? <div>{errors.last_name.message} </div> : null}
                                    </div>
                                    <div>
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            ref={register({
                                                required: {
                                                    value: true,
                                                    message: "Please enter valid username."
                                                },
                                            })}
                                        />
                                        {errors.username ? <div>{errors.username.message} </div> : null}
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            ref={register({
                                                required: {
                                                    value: true,
                                                    message: "Please enter valid email."
                                                }
                                            })}
                                        />
                                        {errors.email ? <div>{errors.email.message} </div> : null}
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
                                        {errors.password ? <div>{errors.password.message} </div> : null}
                                    </div>
                                    <div>
                                        <button type="submit" disabled={submitting}> Create Account</button>
                                    </div>
                                </form>
                            </Card.Body>
                        </Card>
                    </div>
                </Card>
            </div>
        </div>);
}