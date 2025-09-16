import { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "../../components/admindashboard/UserCard";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);   
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </>
  );
}
