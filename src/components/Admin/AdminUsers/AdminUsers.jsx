import React, { useEffect, useState} from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

function AdminUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers(); // Invoke the fetch function
    }, [])

    const toggleAdmin = async (id) => {
        try {
            await axios.put(`/api/user/admin/${id}`);
            fetchUsers();
        } catch (err) {
            console.error("Error changing user's admin status:" , err)
        }
    }

    const fetchUsers = async () => {
        try {
          // Fetch applications data
          const response = await axios.get("/api/user/users");
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
    };

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Is Admin</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.filter((user)=> !user.deleted).map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{String(user.isAdmin)}</td>
                            <td><button onClick={() => toggleAdmin(user.id)}>Toggle Admin</button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )

}

export default AdminUsers;