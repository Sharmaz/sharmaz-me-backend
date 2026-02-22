import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import AccountSection from '../components/AccountSection';
import ProfileSection from '../components/ProfileSection';
import JobsSection from '../components/JobsSection';
import ProjectsSection from '../components/ProjectsSection';
import UsersSection from '../components/UsersSection';

const SECTIONS = {
  account: AccountSection,
  profile: ProfileSection,
  jobs: JobsSection,
  projects: ProjectsSection,
  users: UsersSection,
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('account');

  const Section = SECTIONS[activeTab];

  return (
    <div className="flex m-0 p-0">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <section className="content">
        {Section && <Section />}
      </section>
    </div>
  );
}
