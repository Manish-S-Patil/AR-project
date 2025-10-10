import React, { useEffect, useState } from "react";

export default function BackendDemo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", marginTop: "1rem" }}>
      <h2>Users from Backend:</h2>
      {users.length === 0 ? (
        <p>No users found. Try POSTing to /api/users</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u._id}>{u.name} ({u.email})</li>
          ))}
        </ul>
      )}
    </div>
  );

  
}
