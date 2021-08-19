import React, { Fragment, useState } from 'react'

const InputTodo = () => {
    const [description, setDesc] = useState("")

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {description};
            await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (error) {
            console.log(error.message);
        }
    }

    return(
        <Fragment>
            <h1 className="text-center mt-5">INPUT TODO</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={e => setDesc(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </Fragment>
    )
    
}

export default InputTodo