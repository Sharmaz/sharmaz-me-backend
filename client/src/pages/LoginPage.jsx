import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card flex justify-center align-center">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="flex align-center ft-28">Log in to your account</h2>
        <div className="login-container red-gradient">
          <div className="login-form-content flex justify-center wrap">
            {error && <p className="error-message w-100">{error}</p>}
            <div className="login-email flex between">
              <label className="input-label" htmlFor="email">Email</label>
              <div className="input-border orange-gradient">
                <input
                  className="input-text"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="login-password flex between">
              <label className="input-label" htmlFor="password">Password</label>
              <div className="input-border orange-gradient">
                <input
                  className="input-text"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="purple-gradient mt-20 button-border">
              <button className="button" type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
