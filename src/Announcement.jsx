import React,{useState} from "react"
import InputField from "./InputField";

//array is assumed as sorted here
const Announcement = (props) =>{
    const [newAnnounce,setNewAnnounce] = useState({});
    const listItems = props.announce.map((a) =>
                    <div key={a.title}>
                        <p >{a.title}</p>
                        <p >{a.message}</p>
                    </div>);

    const addItem = () =>{

        const handleChange = (name,value) =>{
            return(setNewAnnounce(prev =>{return({ ...prev , [name]: value})}))
        }
        // Handle submit later;;;
        const handleSubmit = (evt) => {
            evt.preventDefault();
            alert(`Submitting Data ${newAnnounce}`);
            console.log(newAnnounce);
        }


        return <div>
           <form onSubmit ={ (e)=>{handleSubmit(e)}} >
           <InputField name="Title"
                       type ="text"
                       placeholder= "Title"
                       onChange = {handleChange} />
           <InputField name="message"
                       type ="text"
                       placeholder= "Announcement Message"
                       onChange = {handleChange} />
           <button type = "submit" value = "Submit" >
               Post Announcement
           </button>
           </form>
       </div>
    }
    //re render when listItems change


    return(
        <div>
            {(props.level === 1)?(addItem):null}
            {listItems}
        </div>
        )
}
export default Announcement;