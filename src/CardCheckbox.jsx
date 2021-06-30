import {useState} from "react";
import {ReactComponent as DeleteSVG} from "./svgs/delete_black_24dp.svg";
import {ReactComponent as AddSVG} from "./svgs/add_black_24dp.svg";

//tempList format =>[ {"content":content,"isChecked":true/false} ]
const CardCheckbox = (props) => {
    const tempList = (props.checkList || []);

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
        const itemName = e.target.parentNode.getAttribute("data-name");
        let index = e.target.parentNode.getAttribute("index-custom");
        if (tempList[index].content === itemName) {
            let cloneArr = [...tempList];
            cloneArr.splice(index, 1);
            handleListChange(cloneArr);
        }
    }
    const renderList = tempList.map((item, index) => {
        return (
            <div key={item.content} className={"checkbox-item"}>
                <input type="checkbox"
                       name={item.content}
                       index-custom={index}
                       data-name={item.content}
                       checked={item.isChecked} disabled={!props.edit}
                       onChange={(e) => {
                           checkListHandler(e)
                       }}
                />
                <span>
                    {item.content}
                </span>
                {props.edit ? <button type="button" index-custom={index} data-name={item.content}
                                      className={"delete-button"}
                                      onClick={(e) => {
                                          handleCheckListDelete(e)
                                      }}>
                    <DeleteSVG/></button> : null}
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
        <div className={"card-checkbox"}>
            <h2>Progress List :</h2>
            <div className={"checkbox-items-list"}>{renderList}</div>
            {props.edit ?
                <div>
                    <textarea name="addCheckItem" className={"checkbox-input"} onChange={handleAddItem}
                              value={tempItem}>
                        {tempItem}
                    </textarea>
                    <button type="button" className={"add-button"}
                            onClick={(e) => handleAddSubmit(e)}>
                        <AddSVG />
                    </button>
                </div>
                : null}
        </div>
    );
}

export default CardCheckbox;