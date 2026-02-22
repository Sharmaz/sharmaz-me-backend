import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { usersService } from '../services/users';

export default function AccountSection() {
  const { user, logout } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await usersService.update(user.id, { email });
      logout();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="admin-titles flex">
        <h1 className="ft-38">Account</h1>
        <h2 className="ml-40 ft-18">{user?.role}</h2>
      </div>
      {error && <p className="error-message">{error}</p>}
      <form className="relative" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="input-label" htmlFor="account-email">Email</label>
          <div className="input-border orange-gradient mt-20">
            <input
              id="account-email"
              className="input-text"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="button-border purple-gradient absolute save-button">
          <button className="button" type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
