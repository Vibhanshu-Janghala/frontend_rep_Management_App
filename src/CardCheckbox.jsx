import {useState} from "react";

//tempList format =>[ {"content":content,"isChecked":true/false} ]
const CardCheckbox = (props) => {
    const tempList = props.checkList;

    const handleListChange = (newList) => {
        props.onChange({"target": {"name": "progressList", "value": newList}});
    }

    const checkListHandler = (e) => {
        const itemName = e.target.getAttribute("data-name");
        const index = e.target.getAttribute("index-custom");
        const tempCheck = tempList[index].isChecked;
        if (tempList[index].content === itemName) {
            let cloneArr = [...tempList];
            cloneArr.splice(index, 1, {"content": itemName, "isChecked": !tempCheck});
            handleListChange(cloneArr);
        }
    }
    const handleCheckListDelete = (e) => {
        const itemName = e.target.getAttribute("data-name");
        let index = e.target.getAttribute("index-custom");
        if (tempList[index].content === itemName) {
            let cloneArr = [...tempList];
            cloneArr.splice(index, 1);
            handleListChange(cloneArr);
        }
    }
    const renderList = tempList.map((item, index) => {
        return (
            <div key={item.content}>
                <input type="checkbox"
                       name={item.content}
                       index-custom={index}
                       data-name={item.content}
                       checked={item.isChecked} disabled={!props.edit}
                       onChange={(e) => {
                           checkListHandler(e)
                       }}
                />
                <label htmlFor={(item.content)}
                >
                    {item.content}
                </label>
                {props.edit ? <button type="button" index-custom={index} data-name={item.content}
                                      onClick={(e) => {
                                          handleCheckListDelete(e)
                                      }}>
                    Delete Icon</button> : null}
            </div>)
    });
    const [tempItem, setTempItem] = useState("")
    const handleAddItem = (e) => {
        setTempItem(() => (e.target.value));
    }
    const handleAddSubmit = () => {
        handleListChange([...tempList, {"content": tempItem, "isChecked": false}])
        setTempItem("");
    }

    return (
        <div>
            {renderList}
            {props.edit ?
                <div>
                    <input name="addCheckItem" onChange={handleAddItem} value={tempItem}/>
                    <button type="button"
                            onClick={(e) => handleAddSubmit(e)}>
                        Add Icon
                    </button>
                </div>
                : null}
        </div>
    );
}

export default CardCheckbox;