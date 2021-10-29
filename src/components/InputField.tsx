import React, { useRef } from 'react';
import '../styles/style.css';

type Props = {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    addTodo: (e: React.FormEvent) => void;
};

const InputFeild = ({ todo, setTodo, addTodo }: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        addTodo(e);
        inputRef.current?.blur();
    };

    return (
        <form className="input" onSubmit={handleSubmit}>
            <input
                ref={inputRef}
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                type="text"
                placeholder="Enter a Todo"
                className="input__box"
            />
            <button type="submit" className="input_submit">
                GO
            </button>
        </form>
    );
};

export default InputFeild;
