import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import SingleTodo from './SingleTodo';
import { Todo } from '../model';
import '../styles/style.css';

type Props = {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoList = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {
    return (
        <div className="container">
            <Droppable droppableId="TodosList">
                {(provided, snapshot) => (
                    <div
                        className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                        ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="todos__heading">Active Todos</span>
                        {todos?.map((todo, index) => (
                            <SingleTodo
                                index={index}
                                todos={todos}
                                todo={todo}
                                key={todo.id}
                                setTodos={setTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="TodosRemove">
                {(provided, snapshot) => (
                    <div className={`todos ${snapshot.isDraggingOver ? "dragcomplete" : "remove"}`}
                        ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="todos__heading">Completed Todos</span>
                        {completedTodos?.map((todo, index) => (
                            <SingleTodo
                                index={index}
                                todos={completedTodos}
                                todo={todo}
                                key={todo.id}
                                setTodos={setCompletedTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default TodoList;
