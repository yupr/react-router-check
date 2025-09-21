import { cache, Suspense, use } from "react";
import type { User } from "~/routes/Suspense/type";

export function clientLoader() {
  console.log("Suspense loader");
}

export default function SuspensePage() {
  const usersPromise = cache(fetchUsers)();

  return (
    <>
      <h1>Test</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Users usersPromise={usersPromise} />
      </Suspense>
    </>
  );
}

const Users = ({ usersPromise }: { usersPromise: Promise<User[]> }) => {
  const users = use(usersPromise);

  return (
    <ul>
      {users.map((user: User) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

function fetchUsers(): Promise<User[]> {
  return fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
    res.json()
  );
}
