import React, { useEffect, useState } from 'react';
import './Loading2.css';
import loadingGif from './soma1.gif';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        setStatus('loading');
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        setTimeout(() => {
            setUsers([
                { id: 1, name: 'User 1' },
                { id: 2, name: 'User 2' },
            ]);
            setStatus('idle');
        }, 3000);
    };

    const handleAdd = () => {
        if (name.trim()) {
            setUsers((prevUsers) => [...prevUsers, { id: Date.now(), name }]);
            setName('');
            setError('');
        } else {
            setError('Please enter a valid name.');
        }
    };

    const handleDelete = (id) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    };

    if (status === 'loading') {
        return (
            <div className="loader">
                <img src={loadingGif} alt="Loading..." className="loading-gif" />
                <h4>Loading Soma....</h4>
            </div>
        );
    }

    if (status === 'failed') {
        return <p className="fail">Failed to load users.</p>;
    }

    return (
        <div>
            <div className="containerUF">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Username"
                    className="input"
                />
                <button
                    className="addUserBtn"
                    onClick={handleAdd}
                    disabled={!name.trim()}
                >
                    Add User
                </button>
                {error && <p>{error}</p>}
            </div>

            <ul className="fetchingUL">
                <h2 className="fu">Fetched Users</h2>
                <div className="listOfUSER">
                    {users.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </div>
            </ul>

            <ul className="containerUL">
                <h2>USER MANAGEMENT - CAN DELETE USER</h2>
                <div className="listOfUN">
                    {users.map((user) => (
                        <li className="listItem" key={user.id}>
                            <div className="un">{user.name}</div>
                            <button
                                className="deleteBtn"
                                onClick={() => handleDelete(user.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </div>
            </ul>
        </div>
    );
};


export default UserManagement;
