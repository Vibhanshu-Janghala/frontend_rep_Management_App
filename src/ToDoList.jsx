import React,{useState} from "react";
import InputField from "./InputField";
import {useProfile} from "./ProfileContext";

//array need not be sorted here
const ToDoList = () =>{
    let [profileData,setProfileData] = useProfile();
    let [toDoList,setToDoList] = useState(profileData.tdl) ;
    const [newToDo,setNewToDo] = useState({});

    async function handleDelete(e){
        e.preventDefault();
        let index = e.target.getAttribute("index-custom");
        let title = e.target.getAttribute("title-custom");
        if(toDoList[index].title === title){
            let response = await fetch("/api/deleteTDL",
            {
                method: "POST",
                header: {accept: "application/json",
                    Authorization: JSON.stringify(profileData)},
                credentials: "same-origin",
                body: JSON.stringify(title)
            });
            if (response.status === 200){
                   setToDoList((prev)=>{
                       prev.splice(index,1);
                       return prev;
                   })
                setProfileData((prev)=> {return {...prev,tdl:toDoList};
                });
                console.log("Successfully deleted")
            }
            else{
                console.log("Some error occurred");
            }
        }


    }
    // render list of toDoItems
        const listItems = ()=>{
        toDoList.map((tdl,i) =>
            <div key={tdl.title}>
                <p className>{tdl.title}</p>
                <p className >{tdl.content}</p>
                <button type = "button" title-custom={tdl.title}
                        index-custom ={i}
                        onClick ={(e) =>
                            {handleDelete(e).catch((error)=>(console.log("ERROR :---" +error))) }}/>
            </div>);
    }

    // for  adding new ToDoItem

    const addItem = () =>{
        const handleChange = (name,value) =>{
            return(setNewToDo(prev =>{return({ ...prev , [name]: value})}))
        }
     // Submit for Add Item
        async function handleSubmit(e) {
            e.preventDefault();
            let response = await fetch("/api/addTDL",
                {
                    method: "POST",
                    header: {accept: "application/json",
                        Authorization: JSON.stringify(profileData)},
                    credentials: "same-origin",
                    body: JSON.stringify(newToDo)
                });
            setNewToDo(null);
            if (response.status === 200){
                setToDoList((prev)=>prev.push(newToDo));
                setProfileData((prev)=> {return {...prev,tdl:toDoList};
                });
                console.log("Successfully Added")
            }
            else{
                console.log("Some error occurred");
            }

        }


        return <div>
            <form onSubmit ={ (e)=>
                {handleSubmit(e).catch((error)=>console.log("ERROR:---"+error))}} >
                <InputField name="Title"
                            type ="text"
                            placeholder= "Title"
                            onChange = {handleChange} />
                <InputField name="message"
                            type ="text"
                            placeholder= "Description"
                            onChange = {handleChange} />
                <button type = "submit" value = "Submit" >
                    Add
                </button>
            </form>
        </div>
    }


    // elements returned from ToDoComponent
    return(
        <div>
            {(addItem)}
            {listItems}
        </div>
    )
}
export default ToDoList;