import React, { useEffect, useState} from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

function AdminUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers(); // Invoke the fetch function
    }, [])

    const toggleAdmin = async (user) => {
        if(!user.isAdmin){
            if(confirm("Are you sure you want to make this user an Admin?")) {
                try {
                    await axios.put(`/api/user/admin/${user.id}`);
                    fetchUsers();
                } catch (err) {
                    console.error("Error changing user's admin status:" , err)
                }
            }  
        } else {
            if(confirm("Are you sure you want to remove Admin from this user?")) {
                try {
                    await axios.put(`/api/user/admin/${user.id}`);
                    fetchUsers();
                } catch (err) {
                    console.error("Error changing user's admin status:" , err)
                }
            }  
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

    const deleteUser = async (id) => {
        if(confirm("Are you sure you want to make this user an Admin?")) {
            try {
                await axios.delete(`/api/user/deleteUser/${id}`);
                const response = await axios.get("/api/user/users");
                setUsers(response.data);
            } catch (error){
                console.error("Error deleting user:", error);
            }
        }
    }

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Is Admin</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.filter((user)=> !user.deleted).map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{String(user.isAdmin)}</td>
                            <td><button onClick={() => toggleAdmin(user)}>Toggle Admin</button></td>
                            {!user.isAdmin && <td><button onClick={() => deleteUser(user.id)}>Delete User</button></td>}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )

}

export default AdminUsers;