import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
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
      <h2>Account</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="input-label" htmlFor="account-email">Email</label>
          <div className="input-border purple-gradient">
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
        <div className="button-border purple-gradient mt-20">
          <button className="button" type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
