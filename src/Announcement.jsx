import React,{useState} from "react"
import InputField from "./InputField";
import {useProfile} from "./ProfileContext";


const Announcement = () =>{
    // get Announcements at start
    const [announcements,setAnnouncement] = useState([]);
    let [profileData] = useProfile();
    async function fetchAnnouncement() {
        let response = await fetch("/api/announcement",
            {
                method: "GET",
                header: {accept: "application/json",
                Authorization: JSON.stringify(profileData)},
                credentials: "same-origin",
                
            });
        let jsResponse = await response.json();
        setAnnouncement(jsResponse);

    }
    fetchAnnouncement().catch((e)=>console.log("Error :----"+e));

    // handle display and deletion of Announcements
    async function handleAnnounceDelete(e){
         e.preventDefault();
         let index = e.target.getAttribute("index-custom");
         let title = e.target.getAttribute("title-custom");
         if(announcements[index].title === title){
             let response = await fetch("/api/deleteAnnouncement",
                 {
                     method: "POST",
                     header: {accept: "application/json",
                         Authorization: JSON.stringify(profileData)},
                     credentials: "same-origin",
                     body: JSON.stringify(title)
                 });
             if (response.status === 200){
                 setAnnouncement((prev)=>prev.splice(index,1));
                 console.log("Successfully deleted")
             }
             else{
                 console.log("Some error occurred");
             }
         }
    }

    const listItems = announcements.map((a,i) =>
                    <div key={a.title}>
                        <p >{a.title}</p>
                        <p >{a.message}</p>
                        {profileData === 1?
                            <button type="button"
                                    title-custom = {a.title}
                                    index-custom = {i}
                                    onClick={(e)=>handleAnnounceDelete(e)}>
                                Delete
                            </button>
                            :null}
                    </div>);

    // Handle addition of new Announcements
    async function submitNewAnnouncement(announce){
        let response = await fetch("/api/addAnnouncement",
            {
                method: "POST",
                header: {accept: "application/json",
                    Authorization: JSON.stringify(profileData)},
                credentials: "same-origin",
                body: JSON.stringify(announce)
            });
        if(response.status === 201) {
            setAnnouncement((prev) => ([...prev, announce]));
            console.log("Successfully Created");
        }
        else{
            console.log("Some Error occurred")
        }
    }

    let [newAnnounce,setNewAnnounce] = useState({});
    const addItem = () =>{

        const handleChange = (name,value) =>{
            return( setNewAnnounce( ()=>({[name]:value}) ))
        }
        const handleSubmit = (evt) => {
            evt.preventDefault();

            console.log(newAnnounce);
            submitNewAnnouncement(newAnnounce).catch((e)=>console.log("Error :----"+e));
            setNewAnnounce(()=>null);
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
            {(profileData.level === 1)?(addItem):null}
            {listItems}
        </div>
        )
}
export default Announcement;