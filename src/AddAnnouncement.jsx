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
            <form onSubmit={(e)=>handleSubmit(e)} className={"announcement-form"}>
                <input name="title"
                            type="text"
                            placeholder="Title"
                            onChange={handleChange}/>

                    <textarea name="description"
                              onChange={handleChange} placeholder="Description" className={"announce-textarea"}>
                     </textarea>

                <button type="submit">
                    Post
                </button>
            </form>
        </div>
    )
}
export default AddAnnouncement;