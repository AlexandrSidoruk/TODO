import List from "../List";
import React from "react";
import "./AddButtonList.scss"
import Badge from "../Badge";
import closeSvg from "../../assets/img/close.svg";





const AddList = ({colors, onAdd}) => {
    const [visiblePopup , setVisiblePopup] = React.useState(false);
    const [selectedColor , selectColor] = React.useState(colors[0].id);
    const [inputValue , setInputValue] = React.useState('');

    const onClose = () =>{
        setVisiblePopup(false);
        setInputValue('');
        selectColor(colors[0].id);
    }

    const addList = () => {
        if (!inputValue){
            alert('!!!!!!!!!!!!!')
            return
        }
        const color = colors.filter(c => c.id === selectedColor)[0].name
       onAdd( {"id": Math.random(), "name": inputValue, "color": color});
        onClose();

    }

    return(
        <div className='add-list'>
            <List
                onClick={()=>setVisiblePopup(true)}
                items={[
                    {
                        className: "list__add-button",
                        icon: (<svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
                            <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>)
                        ,
                        name: "Додати в список"
                    }
                ]}
            />
            {visiblePopup && (<div className="add-list__popup">
                <img onClick={onClose} src={closeSvg} alt="Close button" className="add-list__popup-close-btn"></img>
               <input
                   value={inputValue}
                   onChange={e => {setInputValue(e.target.value)}}
                   className="field"
                   type="text"
                   placeholder="Назва списку" />

                <div className="add-list__popup-colors">
                   {colors.map(color =>(
                       <Badge
                       onClick={() => selectColor(color.id)}
                       key={color.id}
                       color={color.name}
                       className={selectedColor===color.id && 'active'}
                   />))}
                </div>
               <button className="button" onClick={addList}>Додати список</button>
            </div>)}
        </div>



    )
};

export default AddList;