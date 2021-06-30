import {useProfile} from "./ProfileContext";
import AddToDoItem from "./AddToDoItem";
import "./ToDoList.css";
import {ReactComponent as DeleteSVG} from "./svgs/trash-solid.svg";
//array need not be sorted here
const ToDoList = () => {
    let {profileData, setProfileData} = useProfile();
    let toDoList = profileData.tdl;

    async function handleDelete(e) {
        e.preventDefault();
        let index = e.target.parentNode.parentNode.getAttribute("index-custom");
        let title = e.target.parentNode.parentNode.getAttribute("title-custom");
        if (toDoList[index].title === title) {
            let response = await fetch("http://localhost:8080/api/todoList/delete",
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": JSON.stringify(profileData)
                    },
                    credentials: "include",
                    cache: 'no-cache',
                    referrerPolicy: 'no-referrer',
                    mode: "cors",
                    body: JSON.stringify({"title":title})
                });
            if (response.status === 200) {
                const cloneList = toDoList.filter((item) => item.title !== title)
                setProfileData((prev) => {
                    return {...prev, tdl: cloneList};
                });
                console.log("Successfully deleted ToDo Item");
            } else {
                console.log("Some error occurred");
            }
        }


    }
    // render list of toDoItems
    const listItems = toDoList.map((tdl, i) => {
        return (
            <div key={tdl.title} className={"todo-item"}>
                <span>{tdl.title}</span>
                <button type="button" title-custom={tdl.title}
                        index-custom={i}
                        onClick={(e) => {
                            handleDelete(e).catch((error) => (console.log("ERROR :-" + error)))
                        }}><DeleteSVG />
                </button>
                <p>{tdl.content}</p>

            </div>
        )});


    // for  adding new ToDoItem

        // Submit for Add Item
        async function handleSubmit(newToDo) {
            let response = await fetch("http://localhost:8080/api/todoList/add",
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': JSON.stringify(profileData)
                    },
                    credentials: "include",
                    cache: 'no-cache',
                    referrerPolicy: 'no-referrer',
                    mode: "cors",
                    body: JSON.stringify(newToDo)
                });
            if (response.status === 200) {
                setProfileData((prev) => {
                    return {...prev, tdl: [...toDoList,newToDo]};
                });
                console.log("Successfully Added Todo Item")
            } else {
                console.log("Some error occurred");
            }

        }


    // elements returned from ToDoComponent
    return (
        <div className={"todo-main"}>
            <AddToDoItem onSubmit={handleSubmit}/>
            {listItems}
        </div>
    )
}
export default ToDoList;