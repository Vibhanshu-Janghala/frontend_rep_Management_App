import  {useState} from "react";

const AddAnnouncement = (props) => {

    let [newAnnounce, setNewAnnounce] = useState({"title":"","description":""});
    const handleChange = (event)=> {
        setNewAnnounce((prev)=> {
            return {...prev,[event.target.name]:event.target.value}});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset() ;
        props.onSubmit(newAnnounce);
        setNewAnnounce({"title":"","description":""});
    }


    return (
        <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input name="title"
                            type="text"
                            placeholder="Title"
                            onChange={handleChange}/>
                <input name="description"
                            type="text"
                            placeholder="Announcement Description"
                            onChange={handleChange}/>
                <button type="submit">
                    Post Announcement
                </button>
            </form>
        </div>
    )
}
export default AddAnnouncement;