import React , { useState } from "react";
//import css file

const InputField = (props) => {

    const [value,setValue] = useState("");
    const handleChange = (event)=> {
        setValue(event.target.value)
        props.onChange(event.target.name,event.target.value);
    }
    return(
        <div className={props.className}>
            <label>
                {props.label}
            </label >
            < input
                readOnly= {props.readOnly?props.readOnly:false}
                name = {props.name ? props.name :null}
                type = {props.type ? props.type : "text"}
                onChange = {(event) => handleChange(event)}
                value = {props.value ? props.value : value}
                placeholder = {props.placeholder}
            />

        </div>

    )
}

export default InputField ;
