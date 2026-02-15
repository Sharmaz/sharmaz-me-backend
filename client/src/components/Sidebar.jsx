import { useAuth } from '../context/AuthContext';

const TABS = [
  { key: 'account', label: 'Account' },
  { key: 'profile', label: 'Profile' },
  { key: 'jobs', label: 'Jobs' },
  { key: 'projects', label: 'Projects' },
];

const ADMIN_TABS = [
  { key: 'users', label: 'Users' },
];

export default function Sidebar({ activeTab, onTabChange }) {
  const { user, isAdmin, logout } = useAuth();

  const tabs = isAdmin ? [...TABS, ...ADMIN_TABS] : TABS;

  return (
    <nav className="menu">
      <p className="menu-user">{user?.name || user?.email}</p>
      <ul className="menu-list">
        {tabs.map((tab) => (
          <li
            key={tab.key}
            className={activeTab === tab.key ? 'active' : ''}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}
