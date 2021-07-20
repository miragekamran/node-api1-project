import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./App.css";
import CreateUser from './Components/CreateUser';
import DelectUser from './Components/DeleteUser';


function App() {
    const [data, setData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState([]);

    const { register, handleSubmit } = useForm();
    const onSubmit = (submittedData) => {
        axios
            .put(
                `https://apii-server.herokuapp.com/users/${submittedData.id}`,
                submittedData
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => window.location.reload());
        setShowForm(false);
    };

    useEffect(() => {
        axios
            .get("https://apii-server.herokuapp.com/users")
            .then((res) => {
                console.log(res);
                setData(res.data);
            })
            .catch((err) => {
                console.log("error", err);
            });
    }, []);

    function updateFormHandler(e, id, name, bio) {
        e.preventDefault();
        setShowForm(true);
        setFormData({
            id: id,
            name: name,
            bio: bio,
        });

        console.log("The link was clicked.");
    }

    function cancel(e) {
        e.preventDefault();
        console.log("The link was clicked.");
        setShowForm(false);
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>App for Backend Project</h1>

                {showForm ? (
                    <>
                        <h3>Update {formData.name}</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input
                                type="hidden"
                                placeholder={formData.id}
                                name="id"
                                defaultValue={formData.id}
                                ref={register({
                                    required: true,
                                    maxLength: 80,
                                })}
                            />
                            <input
                                type="text"
                                placeholder={formData.name}
                                name="name"
                                defaultValue={formData.name}
                                ref={register({
                                    required: true,
                                    maxLength: 80,
                                })}
                            />
                            <input
                                type="text"
                                placeholder={formData.bio}
                                name="bio"
                                defaultValue={formData.bio}
                                ref={register({
                                    required: true,
                                    maxLength: 100,
                                })}
                            />

                            <input type="submit" />
                        </form>
                        <br />
                        <button onClick={cancel}>Cancel</button>
                    </>
                ) : (
                    <>
                        <CreateUser />
                    </>
                )}
                <div>
                    {data.map((data) => (
                        <div key={data.id}>
                            <p>
                                Name: {data.name}
                                <br />
                                Bio: {data.bio}
                            </p>
                            <button
                                onClick={(e) =>
                                    updateFormHandler(
                                        e,
                                        data.id,
                                        data.name,
                                        data.bio
                                    )
                                }
                            >
                                update
                            </button>{" "}
                            ||{" "}
                            <button onClick={(e) => DelectUser(e, data.id)}>
                                delete
                            </button>
                        </div>
                    ))}
                </div>
            </header>
        </div>
    );
}

export default App;

