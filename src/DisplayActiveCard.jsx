import CardCheckbox from "./CardCheckbox";
import { useState} from "react";
import {useProfile} from "./ProfileContext";
import {ReactComponent as CloseSVG} from "./svgs/close_black_36dp.svg";
import {ReactComponent as EditSVG} from "./svgs/edit_black_24dp.svg";
import {ReactComponent as DeleteSVG} from "./svgs/delete_black_24dp.svg";
import {ReactComponent as CancelSVG} from "./svgs/cancel_black_24dp.svg";
import {ReactComponent as SaveSVG} from "./svgs/save_black_24dp.svg";



// props contain listName,newCard,cardTitle, card and Updater function
const DisplayActiveCard = (props) => {
    const {profileData} = useProfile();
    const newCard = props.newCard;
    const [editMode, setEditMode] = useState(false);
    //const initialInput = {...(props.card)}
    const [cardInput, setCardInput] = useState({...(props.card)});
    const handleInput = (e) => {
        return setCardInput((prev) => ({...prev, [e.target.name]: e.target.value}));
    }
    const handleSubmit = ()=>{
        props.onButtonClick("save", cardInput, newCard);
    }
    const handleDeleteButton = ()=>{
        props.onButtonClick("delete", null, newCard);
    }
    const handleCancelButton = ()=>{
        setCardInput({...(props.card)});
        setEditMode(false);
    }
    const handleCloseCard = ()=>{
        props.onButtonClick("closeCard", null, null);
    }
    const handleEditToggle =  ()=>{
        setEditMode(true);
    }

    // ADD ROWS AND COLUMN TO TEXTAREA LATER
    return (
            <div className={"active-card"}>
                <textarea
                    className={"card-title"}
                    name="title"
                    value={cardInput.title}
                    disabled={!(editMode||newCard)}
                    onChange={handleInput}>
                    {cardInput.title}
                </textarea>


                <button type="button" className={"close-button"} onClick={handleCloseCard}>
                   <CloseSVG/>
                </button>

                <span className={"parent-list"}>in list <span>{props.listName}</span> </span>
                <div>
                    {(profileData.level === 2 || profileData.level === 1) ?
                        (editMode||newCard) ? <div>
                                <button name="save-card"
                                        type="button"
                                        onClick={handleSubmit}
                                        className={"save-button"}
                                >
                                    <SaveSVG /><span>Save</span>
                                </button>
                                <button name="cancel-card"
                                        type="button"
                                        onClick={ handleCancelButton }
                                        className={"cancel-button"}
                                >
                                    <CancelSVG/><span>Cancel</span>
                                </button>
                            </div>
                            :
                            <div>
                                <button name="edit-card"
                                        type="button"
                                        onClick={ handleEditToggle }
                                        className={"edit-button"}
                                >
                                    <EditSVG /><span>Edit</span>
                                </button>
                                <button name="delete-card"
                                        type="button"
                                        onClick={ handleDeleteButton }
                                        className={"delete-button"}
                                >
                                    <DeleteSVG /><span>Delete</span>
                                </button>
                            </div> : null
                    }
                </div>


                <div>
                    <label htmlFor="givenDescription"> Description </label>
                    <textarea name="givenDescription"
                              className={"card-description"}
                              id={"givenDescription"}
                              disabled={!(editMode||newCard)}
                              value={cardInput.givenDescription}
                              onChange={handleInput}>
                        {cardInput.givenDescription}
                     </textarea>
                </div>
                <CardCheckbox edit={(editMode||newCard)}
                              onChange={handleInput}
                              checkList={cardInput.progressList}
                />

                <label htmlFor="managedBy">Managed by :</label>
                <input name="managedBy"
                       value={cardInput.managedBy}
                       onChange={handleInput}
                       disabled={!(editMode||newCard)}
                />
                <label htmlFor="priority">Task Priority :</label>
                <input name="priority"
                       value={cardInput.priority}
                       onChange={handleInput}
                       disabled={!(editMode||newCard)}
                />
                <label htmlFor="dueDate">Due Date</label>
                <input type="date"
                       name="dueDate"
                       value={cardInput.dueDate}
                       disabled={!(editMode||newCard)}
                       onChange={handleInput}
                />
            </div>
        );

}
export default DisplayActiveCard;