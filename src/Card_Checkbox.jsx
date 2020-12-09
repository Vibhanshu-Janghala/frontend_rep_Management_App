import React,{useState} from "react";
import InputField from "./InputField";

//tempList format =>[ {content:content,checked:true/false} ]
const CardCheckbox = ()=>{
    const [tempList,setTempList]= useState(props.checkList)
    const checkListHandler = (e)=>{
        const itemName = e.target.name;
        const isChecked = e.target.checked;
        for(let i=0;i<tempList.length;i++){
            if(tempList[i].content === itemName){
               setTempList((prev)=>{
                   return prev.splice(i,1,{"content":itemName,"checked":!isChecked})
               })
            }
        }

    }
    const handleCheckListDelete = (e)=>{
       const itemName = e.target.name;
       for(let i=0;i<tempList.length;i++){
           if(tempList[i].content === itemName){
               setTempList((prev) =>{
                  return prev.splice(i,1);
               })
           }
       }
    }
    const renderList = tempList.map((item)=>{
        return(
            <div>
                <input type="checkbox"
                       id={(item.content).substr(0,10)}
                       name={item.content}
                       checked={item.checked}/>
                <label htmlFor={(item.content).substr(0,10)}
                    onClick={(e)=>{checkListHandler(e)}}>
                    {item.content}
                </label>
                <button type="button" name={item.content}
                        onClick={(e)=>{handleCheckListDelete(e)}}>
                    Delete Icon</button>
            </div>
        )
    })
    const [tempItem,setTempItem]= useState({})
    const handleAddItem = (name,value)=>{
        setTempItem((prev)=>({...prev,[name]:value}))
    }
    const handleAddSubmit = ()={

    }

    return(
   <div>
     {renderList}
     <InputField name="addCheckItem" onChange={{handleAddItem}} />
     <button type="button" name="inputButton"
             onClick={handleAddSubmit}>
             Add Icon
     </button>
   </div>
      )
}

export default CardCheckbox;