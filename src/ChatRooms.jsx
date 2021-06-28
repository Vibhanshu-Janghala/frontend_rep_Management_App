import {useState} from "react";
import {ReactComponent as DeleteSVG} from "./icons/trash-solid.svg";


// props contain chat room names and state handler for rooms
const ChatRooms = (props) => {

// handle room display and deletion
    // name = Room Name & value = Room Index
    const setItem = (e) => (props.onChange(e.target.name, e.target.value));
    const deleter = (e) => (props.onDelete(e.target.parentNode.parentNode.attributes.name.nodeValue,
        e.target.parentNode.parentNode.attributes.value.nodeValue));
    const roomsObj = props.rooms;
    const keysArr = Object.keys(roomsObj);
    const list = keysArr.map((roomKey) => {
        return (
            <div key={roomKey} className={"room-item"}>
                <button type="button" name={roomKey} value={roomsObj[roomKey]}
                        onClick={(e)=>{setItem(e);setRoomsHidden(true)}}>
                    {roomKey}
                </button>
                {props.level === 2 ?
                    <button type="button" name={roomKey} value={roomsObj[roomKey]} onClick={deleter}
                            className={"delete-icon"}>
                        <DeleteSVG/>
                    </button>
                    : null}
            </div>
        )
    });


    // handle room addition
    const [addRoom, setAddRoom] = useState(false);
    const [newRoom, setNewRoom] = useState("");
    const toggleAddRoom = () => {
        setAddRoom((prevState) => !prevState);
    }
    const handleChange = (e) => {
        setNewRoom(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onAddRoom(newRoom);
        setNewRoom("");
        setAddRoom(false);
    }
    // show hide rooms
    const [roomsHidden,setRoomsHidden] = useState(false);
    return (
        <div className={"chat-room-main"}>
            <h2 onClick={()=>setRoomsHidden((prev)=>!prev)}>Chat Rooms</h2>
            <div className={roomsHidden ? "chat-room-flex room-hidden":"chat-room-flex"}>
                {props.level === 2 ? <div className={"room-item"}>
                    <button type="button" onClick={() => toggleAddRoom()}>Add Room</button>
                </div> : null}
                {props.level === 2 && addRoom ?
                    <div className={"room-item"}>
                        <form hidden={!addRoom} onSubmit={(e) => handleSubmit(e)}
                              className={"form-no-hover"}>
                            <input
                                name="room"
                                placeholder="Enter Room Name"
                                value={newRoom}
                                onChange={handleChange}
                            />
                            <button type="submit" value="Submit">Confirm</button>
                        </form>
                    </div>
                    : null
                }
                {list}
            </div>
        </div>
    );
}

export default ChatRooms;