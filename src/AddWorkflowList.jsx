import {useState} from "react";

const AddWorkflowList = (props) => {
    // add new list
    const [newList, setNewList] = useState("");
    const handleChange = (e) => {
        setNewList(e.target.value);
    }

    // Submit for Add Item
    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        props.onSubmit({"listName": newList});
        setNewList("");
    }

    return (
        <div className={"workflow-list-form"}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input name="listName"
                       type="text"
                       placeholder="Title"
                       value={newList}
                       onChange={handleChange}/>
                <button type="submit"
                        value="Submit">
                    Add
                </button>
            </form>

        </div>)
}
export default AddWorkflowList;