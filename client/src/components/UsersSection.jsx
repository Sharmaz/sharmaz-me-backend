import { useState, useEffect } from 'react';
import { usersService } from '../services/users';
import DataTable from './DataTable';

const EMPTY_USER = { email: '', password: '', role: 'user' };

const columns = [
  { key: 'email', label: 'Email', className: 'users-email' },
  { key: 'role', label: 'Role', className: 'users-role' },
];

export default function UsersSection() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(EMPTY_USER);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await usersService.getAll();
      setUsers(data);
    } catch {
      setUsers([]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (user) => {
    setForm({ email: user.email, role: user.role, password: '' });
    setEditing(user.id);
    setShowForm(true);
  };

  const handleCreate = () => {
    setForm(EMPTY_USER);
    setEditing(null);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editing) {
        const { password, ...data } = form;
        await usersService.update(editing, data);
      } else {
        await usersService.create(form);
      }
      setShowForm(false);
      await loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await usersService.delete(id);
      await loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex between">
        <h2>Users</h2>
        {!showForm && (
          <div className="button-border purple-gradient">
            <button className="button" onClick={handleCreate}>Add New User</button>
          </div>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-40">
          <h3>{editing ? 'Edit User' : 'New User'}</h3>
          <div className="form-group">
            <label className="input-label" htmlFor="user-email">Email</label>
            <div className="input-border orange-gradient">
              <input
                id="user-email"
                className="input-text"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {!editing && (
            <div className="form-group">
              <label className="input-label" htmlFor="user-password">Password</label>
              <div className="input-border orange-gradient">
                <input
                  id="user-password"
                  className="input-text"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}
          <div className="form-group">
            <label className="input-label" htmlFor="user-role">Role</label>
            <select
              id="user-role"
              className="input-select"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex mt-20">
            <div className="button-border purple-gradient">
              <button className="button" type="submit">Save</button>
            </div>
            <div className="button-border orange-gradient">
              <button className="button" type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </form>
      )}

      {users.length > 0 && (
        <DataTable columns={columns} data={users} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}
