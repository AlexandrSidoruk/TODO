import React from "react";
import "./Tasks.scss"
import editSvg from "../../assets/img/edit.svg"
import axios from "axios";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";


const Tasks = ({list, onEditTitle, onAddTask, onRemoveTask, onEditTask, withoutEmpty}) => {

    const editTitle = () => {
        const newTitle = window.prompt('Назва списка', list.name);
        if (newTitle) {
            onEditTitle(list.id, newTitle);
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            }).catch(() => {
                alert("Не вдалось змінити назву списка");
            });
        }
    };


    return (
        <div className="tasks">
            <h2 style={{color: list.color.hex}} className="tasks__title">
                {list.name}
                <img onClick={editTitle} src={editSvg} alt="edit icon"/>
            </h2>

            <div className="tasks__items">
                {!withoutEmpty && list.tasks && !list.tasks.length && (<h2>Не має задач</h2>)}
                {list.tasks && list.tasks.map(task => (
                    <Task key={task.id} list={list} onEdit={onEditTask} onRemove={onRemoveTask} {...task} />))}
                <AddTaskForm key={list.id} list={list} onAddTask={onAddTask}/>

            </div>
        </div>);

};

export default Tasks;