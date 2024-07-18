import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Utilizatori.scss';

const Utilizatori = () => {
  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const filteredRoles = ["ROLE_USER", "ROLE_ADMIN", "ROLE_CREATOR_CONTINUT"];
  const rolesOptions = filteredRoles;

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/admin/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      const sortedData = data.sort((a, b) => a.username.localeCompare(b.username));

      setUsersData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRowClick = (user, index) => {
    setSelectedRowIndex(index);
    setSelectedUser({
      ...user,
      rol: user.role.name,
      username: user.username,
      nume: user.nume,
      prenume: user.prenume
    });
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5050/api/admin/users/${selectedUser.username}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedUser),
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5050/api/admin/users/${selectedUser.username}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        fetchData();
        setSelectedUser(null);
        setSelectedRowIndex(null);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getOptionDisplayName = (role) => {
    switch (role) {
      case "ROLE_USER":
        return "USER";
      case "ROLE_ADMIN":
        return "ADMINISTRATOR";
      case "ROLE_CREATOR_CONTINUT":
        return "CONTENT CREATOR";
      default:
        return role;
    }
  };

  return (
    <div className='utilizatoradmin'>
      <div className="left-column">
        <h3>Utilizatori</h3>
        <table>
          <thead>
            {usersData.map((user, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? 'alb' : 'albastru'} ${selectedRowIndex === index ? 'selected-row' : ''}`}
                onClick={() => handleRowClick(user, index)}
              >
                <td>{user.username}</td>
                <td>{user.nume}</td>
                <td>{user.prenume}</td>
                <td>{getOptionDisplayName(user.role.name)}</td>
              </tr>
            ))}
          </thead>
        </table>
      </div>

      {selectedUser && (
        <div className="right-column">
          <h3>Edit</h3>
          <div className="input-row">
            <label htmlFor="utilizator">Username</label>
            <input
              type="text"
              id="username"
              value={selectedUser.username}
            />
          </div>

          <div className="input-row">
            <label htmlFor="nume">Nume</label>
            <input type="text" id="nume" value={selectedUser.nume} onChange={(e) => handleInputChange(e, 'nume')} />
          </div>

          <div className="input-row">
            <label htmlFor="prenume">Prenume</label>
            <input
              type="text"
              id="prenume"
              value={selectedUser.prenume}
              onChange={(e) => handleInputChange(e, 'prenume')}
            />
          </div>

          <div className="input-row">
            <label htmlFor="rol">Rol</label>
            <select id="rol" value={selectedUser.rol} onChange={(e) => handleInputChange(e, 'rol')}>
              {filteredRoles.map((option) => (
                <option key={option} value={option}>
                  {getOptionDisplayName(option)}
                </option>
              ))}
            </select>
          </div>

          <div className="icons-container">
            <FontAwesomeIcon icon={faSave} className="save-icon" onClick={handleSave} />
            <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={handleDelete} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Utilizatori;
