import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean
}

const TodosList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const limit = 40;

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
                    params: {
                        _limit: limit,
                        _page: page
                    }
                });
                console.log(res.data);
                setTodos(res.data)
                setLoading(false);
            } catch(error) {
                setError('Error fetching todos');
                setLoading(false);
            }
        }

        fetchTodos();
    }, [page]);

    const nextPage = () => setPage((prevPage) => prevPage + 1);
    const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1)); 

    if (loading) {
        return <div>Loading ...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <h1>Todo List</h1>
            <ol>
                {todos.map((todo) => (
                    <li value={todo.id} key={todo.id}>
                        {todo.title}, {todo.completed}
                    </li>
                ))}
            </ol>
            <button onClick={prevPage} disabled={page === 1}>Previous</button>
            <button onClick={nextPage}>Next</button>
        </div>
    )}

    export default TodosList;