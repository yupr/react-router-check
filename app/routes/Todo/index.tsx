import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";

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

export default function TodoPage() {
  const { data, loading, error } = useQuery<{ getTodos: Todo[] }>(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  const [title, setTitle] = useState("");

  const todos = data?.getTodos || [];

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  const handleAddTodo = async () => {
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

  return (
    <div>
      <h1>TO DO List</h1>
      <input
        type="text"
        placeholder="TODOを追加してください"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAddTodo}>追加</button>
      <ul>
        {todos.map((todo: Todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleUpdateTodo(todo.id, todo.completed)}
            />
            {todo.title}

            <button onClick={() => handleDeleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
