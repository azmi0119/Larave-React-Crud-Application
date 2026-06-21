import { useEffect, useState } from "react";
import axios from "axios";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        const response = await axios.get("http://127.0.0.1:8000/api/users");
        setUsers(response.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <table border="1" width="100%" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <EditUser user={user} fetchUsers={fetchUsers} />
                                {/* This is a comment that show the gap in between buttons */}
                                {" "}
                                <DeleteUser id={user.id} fetchUsers={fetchUsers} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;