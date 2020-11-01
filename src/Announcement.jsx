import React,{useState} from "react"
import InputField from "./InputField";

//array is assumed as sorted here
const Announcement = (props) =>{
    const [newAnnounce,setNewAnnounce] = useState({});
    const listItems = props.announce.map((a) =>
                    <div>
                        <p className={announceTitle}>{a.title}</p>
                        <p className={{announceMessage}} >{a.message}</p>
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



    return(
        <div>
            {(props.lvl === 1)?(addItem):null}
            {listItems}
        </div>
        )
}
export default Announcement;