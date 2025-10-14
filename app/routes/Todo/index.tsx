import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  CircularProgress,
  Checkbox,
  Stack,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const GET_TODOS = gql`
  query getTodos {
    getTodos {
      id
      title
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation addTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

const UPDATE_TODO = gql`
  mutation updateTodo($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      id
      title
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      title
      completed
    }
  }
`;

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function TodoPage() {
  const { data, loading, error } = useQuery<{ getTodos: Todo[] }>(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  const [title, setTitle] = useState("");

  const todos = data?.getTodos || [];

  const handleAddTodo = async () => {
    // 空の TODO は追加しない
    if (title.trim() === "") return;

    await addTodo({
      variables: { title },
      refetchQueries: [{ query: GET_TODOS }],
    });

    setTitle("");
  };

  const handleUpdateTodo = async (id: string, completed: boolean) => {
    await updateTodo({
      variables: { id, completed: !completed },
      refetchQueries: [{ query: GET_TODOS }],
    });
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo({
      variables: { id },
      refetchQueries: [{ query: GET_TODOS }],
    });
  };

  if (loading) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box mt={4} textAlign="center">
            <Typography variant="h6" color="error">
              Error: {error.message}
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box my={4} textAlign="center">
          <Typography variant="h3" component="h1" gutterBottom>
            To Do List
          </Typography>

          {/* 入力フォームと追加ボタン */}
          <Stack direction="row" spacing={2} mb={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="新しいTODOを追加"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddTodo();
                }
              }}
            />
            <Button
              variant="contained"
              onClick={handleAddTodo}
              disabled={title.trim() === ""}
              sx={{ whiteSpace: "nowrap" }}
            >
              追加
            </Button>
          </Stack>

          {/* TODOリスト */}
          <List>
            {todos.map((todo: Todo) => (
              <ListItem
                key={todo.id}
                sx={{
                  mb: 1,
                  bgcolor: "background.paper",
                  borderRadius: 1,
                }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <Checkbox
                  edge="start"
                  checked={todo.completed}
                  tabIndex={-1}
                  disableRipple
                  onChange={() => handleUpdateTodo(todo.id, todo.completed)}
                />
                <ListItemText
                  primary={todo.title}
                  sx={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    opacity: todo.completed ? 0.5 : 1,
                    transition: "all 0.2s",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
