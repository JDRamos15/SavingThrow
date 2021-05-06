import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { isPropertySignature } from "typescript";
import { login } from "../../Services/authentication";
import { useHistory } from "react-router-dom";
import { isLogged, getPublicId, getUsername, logout } from "../../Services/authentication";
import { Card } from "react-bootstrap";
import './Login.css';



interface FormData {
    username: string;
    password: string;

}
export default function Login(props: { history: string[]; }) {
    const { register, handleSubmit, errors, } = useForm<FormData>({});
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [serverErrors, setServerErrors] = useState<Array<string>>([]);
    return (
        <div className="d-flex justify-content-center">
            <div >
                <Card bg='info' style={{width: '20vw', height: '38vh', paddingTop: '3vh'}}>
                    <div className="d-flex justify-content-center">
                        <Card>
                            <Card.Body>
                                <form onSubmit={handleSubmit(async (formData) => {
                                    setSubmitting(true);
                                    setServerErrors([]);

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
                                    if (data['status'] == "Success") {
                                        login(data['loggedIn'], data['token'], data['username'], data['public_id'], data['fname'])
                                        window.location.href = '/profile/' + data['username']
                                    }
                                    else {
                                        setServerErrors([data['error']]);
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
                                        <h1>Login</h1>
                                        <label htmlFor="username"> Username</label>
                                        <input
                                            type="username"
                                            name="username"
                                            id="username"
                                            ref={register({
                                                required: {
                                                    value: true,
                                                    message: "Please enter valid username."
                                                }
                                            })}
                                        />
                                        {errors.username ? <div>{errors.username.message} </div> : null}
                                    </div>
                                    <div>
                                        <label htmlFor="password"> Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            ref={register({ required: "required" })}
                                        />
                                        {errors.password ? <div>{errors.password.message} </div> : null}
                                    </div>
                                    <div>
                                        <button type="submit" disabled={submitting}> Login </button>
                                    </div>
                                </form>
                            </Card.Body>
                        </Card>
                    </div>
                </Card>
            </div>


        </div>

    );
}