import React,{useState,useEffect} from "react";
import InputField from "./InputField";

//tempList format =>[ {content:content,checked:true/false} ]
const CardCheckbox = (props)=>{
    const [tempList,setTempList]= useState(props.checkList)
    useEffect(()=>{
        props.onChange("progressList",tempList)

        },  // eslint-disable-next-line react-hooks/exhaustive-deps
        [tempList])

    const checkListHandler = (e)=>{
        const itemName = e.target.name;
        const isChecked = e.target.checked;
        for(let i=0;i<tempList.length;i++){
            if(tempList[i].content === itemName){
               setTempList((prev)=>{
                   prev.splice(i,1,{"content":itemName,"checked":!isChecked})
                   return prev;
               })
            }
        }

    }
    const handleCheckListDelete = (e)=>{
       const itemName = e.target.name;
       for(let i=0;i<tempList.length;i++){
           if(tempList[i].content === itemName){
               setTempList((prev) =>{
                  prev.splice(i,1);
                  return prev;
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
                       checked={item.checked} disabled={props.edit}/>
                <label htmlFor={(item.content).substr(0,10)}
                    onClick={(e)=>{checkListHandler(e)}}>
                    {item.content}
                </label>
                {props.edit?<button type="button" name={item.content}
                         onClick={(e) => {
                             handleCheckListDelete(e)
                         }}>
                    Delete Icon</button>:null}
            </div>
        )
    })
    const [tempItem,setTempItem] = useState({})
    const handleAddItem = (name,value)=>{
        setTempItem((prev)=>({...prev,[name]:value}))
    }
    const handleAddSubmit = ()=>{
        setTempList((prev) =>{return {...prev,tempItem}})
    }

    return(
   <div>
     {renderList}
       {props.edit?
           <div><InputField name="addCheckItem" onChange={{handleAddItem}}/>
            <button type="button" name="inputButton"
                onClick={handleAddSubmit}>
            Add Icon
            </button>
           </div>
           :null}
   </div>
      )
}

export default CardCheckbox;