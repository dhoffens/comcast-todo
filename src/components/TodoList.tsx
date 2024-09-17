import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchTodos, completeTodo, Todo } from '../reducers/todoReducer';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Container,
    CircularProgress,
    Alert,
    Stack,
  } from '@mui/material';

const TodosList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [page, setPage] = useState<number>(1);
    const limit = 40;
    const {todos, loading, error} = useSelector((state: RootState) => state);

    useEffect(() => {
        dispatch(fetchTodos({ page, limit }))
    }, [dispatch, page]);

    const handleComplete = (id: number) => {
        dispatch(completeTodo(id));
      };

    const nextPage = () => setPage((prevPage) => prevPage + 1);
    const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1)); 

    if (loading) {
        return <div>Loading ...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
          <Typography variant="h4" gutterBottom>
            Todo List
          </Typography>
    
          {loading && (
            <Stack alignItems="center">
              <CircularProgress />
            </Stack>
          )}
    
          {error && <Alert severity="error">{error}</Alert>}
    
          <Table>
        <TableHead>
          <TableRow>
            <TableCell>Todo</TableCell>
            <TableCell>Completed</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo: Todo) => (
            <TableRow key={todo.id}>
              <TableCell>
                <Typography
                  variant="body1"
                >
                  {todo.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                  }}
                >
                  {todo.title}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {todo.completed ? 'Yes' : 'No'}
                </Typography>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleComplete(todo.id)}
                  disabled={todo.completed}
                >
                  {todo.completed ? 'Completed' : 'Complete'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    
          <Stack direction="row" spacing={2} justifyContent="center" marginTop={2}>
            <Button variant="contained" color="secondary" onClick={prevPage} disabled={page === 1}>
              Previous
            </Button>
            <Button variant="contained" color="secondary" onClick={nextPage}>
              Next
            </Button>
          </Stack>
        </Container>
      );
    }

    export default TodosList;