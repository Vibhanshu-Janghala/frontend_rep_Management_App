import {useState} from "react";


// props contain chat room names and state handler for rooms
const ChatRooms = (props) => {

// handle room display and deletion
    // name = Room Name & value = Room Index
    const setItem = (e) => (props.onChange(e.target.name, e.target.value));
    const deleter = (e) => (props.onDelete(e.target.name, e.target.value));
    const roomsObj = props.rooms;
    const keysArr = Object.keys(roomsObj);
    const list = keysArr.map((roomKey) => {
        return (
            <div key={roomKey}>
                <button type="button" name={roomKey} value={roomsObj[roomKey]} onClick={setItem}>
                    {roomKey}
                </button>
                {props.level === 2 ?
                    <button type="button" name={roomKey} value={roomsObj[roomKey]} onClick={deleter}>
                        Delete
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

    return (
        <div>
            {props.level === 2 ?
                <div>
                    <button type="button" onClick={() => toggleAddRoom()}>Add Room</button>
                    <form hidden={!addRoom} onSubmit={(e) => handleSubmit(e)}>
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
    );
}

export default ChatRooms;