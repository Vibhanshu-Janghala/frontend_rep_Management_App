import React , { useState } from "react";

//import css file

const InputField = (props) => {

    const [value,setValue] = useState("");
    const handleChange = (event)=> {
        setValue(event.target.value)
        props.onChange(event.target.name,event.target.value)
    }
    return(
        <div>
            <label>
                {props.name}
            </label >
            < input
                name = {props.name}
                type = {props.type}
                onChange = {(event) => handleChange(event)}
                value = {props.value ? props.value : value}
                placeholder = {props.placeholder}
            />

        </div>

    )
}

export default InputField ;
