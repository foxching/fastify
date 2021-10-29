import React, { useState, useRef, useEffect } from 'react';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import '../styles/style.css';
import { Todo } from '../model';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
    todos: Todo[];
    todo: Todo;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    index: number;
};

const SingleTodo = ({ todos, todo, setTodos, index }: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const inputRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);


    const handleEditClick = (todo: Todo) => {
        if (!edit && !todo.isDone) {
            setEdit(!edit)
        }
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
        );
        setEdit(false);
    }

    const handleDone = (id: number) => {
        const updatedTodo = todos.map(t => {
            if (t.id === id) {
                return {
                    ...t,
                    isDone: !t.isDone
                }
            } else {
                return t
            }
        })

        setTodos(updatedTodo)
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter(t => t.id !== id))
    }

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided, snapshot) => (
                    <form
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
                        onSubmit={(e) => handleEdit(e, todo.id)}
                    >
                        {edit ?
                            <input
                                type="text"
                                value={editTodo}
                                onChange={(e) => setEditTodo(e.target.value)}
                                className="todos__single--text"
                                ref={inputRef}
                            />
                            :
                            todo.isDone
                                ?
                                <s className="todos__single--text">{todo.todo}</s>
                                :
                                <span className="todos__single--text">{todo.todo}</span>

                        }
                        <div>
                            <span className="icon" onClick={() => handleEditClick(todo)}>
                                <AiFillEdit />
                            </span>
                            <span className="icon" onClick={() => handleDelete(todo.id)}>
                                <AiFillDelete />
                            </span>
                            <span className="icon" onClick={() => handleDone(todo.id)}>
                                <MdDone />
                            </span>
                        </div>
                    </form>
                )
            }
        </Draggable>

    );
};

export default SingleTodo;