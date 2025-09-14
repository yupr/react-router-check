import { useEffect, useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export default function Suspense() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://api.example.com/user");
        const data: User = await response.json();

        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Suspense</h1>
      {user ? (
        <p>
          User: {user.firstName} {user.lastName}
        </p>
      ) : (
        <p>No user data</p>
      )}
    </div>
  );
}
