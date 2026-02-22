import { useAuth } from '../context/useAuth';

const TABS = [
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
    <nav className="menu flex flex-col">
      <div className="my-20 align-self-center">
        <img src="/logo.png" alt="logo" width="100" height="100" />
      </div>
      <p
        className={`menu-user ft-28${activeTab === 'account' ? ' active' : ''}`}
        onClick={() => onTabChange('account')}
      >
        {user?.profile?.name || user?.email}
      </p>
      <ul className="menu-list m-0 p-0 ft-28">
        {tabs.map((tab) => (
          <li
            key={tab.key}
            className={activeTab === tab.key ? 'active' : ''}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
          </li>
        ))}
        <li onClick={logout}>Log Out</li>
      </ul>
    </nav>
  );
}
