import { useState, useEffect } from 'react';
import { profilesService } from '../services/profiles';

const EMPTY_PROFILE = {
  name: '', profilePic: '', about: '', blog: '',
  github: '', linkedIn: '', twitter: '', resume: '',
};

export default function ProfileSection() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(EMPTY_PROFILE);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profiles = await profilesService.getAll();
      if (profiles && profiles.length > 0) {
        setProfile(profiles[0]);
        setForm(profiles[0]);
      }
    } catch {
      setProfile(null);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (profile) {
        await profilesService.update(profile.id, form);
      } else {
        await profilesService.create(form);
      }
      await loadProfile();
      setEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!profile) return;
    try {
      await profilesService.delete(profile.id);
      setProfile(null);
      setForm(EMPTY_PROFILE);
    } catch (err) {
      setError(err.message);
    }
  };

  const URL_FIELDS = ['blog', 'github', 'linkedIn', 'twitter', 'resume'];

  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'profilePic', label: 'Profile Pic URL', type: 'text' },
    { name: 'resume', label: 'Resume URL', type: 'text' },
    { name: 'blog', label: 'Blog URL', type: 'text' },
    { name: 'github', label: 'Github URL', type: 'text' },
    { name: 'linkedIn', label: 'LinkedIn URL', type: 'text' },
    { name: 'twitter', label: 'Twitter URL', type: 'text' },
  ];

  if (!editing && !profile) {
    return (
      <div>
        <h1 className="ft-38">Profile</h1>
        <p>No profile yet.</p>
        <div className="button-border purple-gradient">
          <button className="button" onClick={() => setEditing(true)}>Create Profile</button>
        </div>
      </div>
    );
  }

  if (!editing && profile) {
    return (
      <div>
        <h1 className="ft-38">Profile</h1>
        {profile.profilePic && (
          <img className="profile-pic" src={profile.profilePic} alt={profile.name} />
        )}
        {profile.name && <p><strong>Name:</strong> {profile.name}</p>}
        {profile.about && <p><strong>About:</strong> {profile.about}</p>}
        {URL_FIELDS.map((key) => profile[key] ? (
          <p key={key}>
            <strong>{fields.find((f) => f.name === key)?.label}:</strong>{' '}
            <a className="profile-link" href={profile[key]} target="_blank" rel="noopener noreferrer">
              {profile[key]}
            </a>
          </p>
        ) : null)}
        <div className="flex mt-20">
          <div className="button-border orange-gradient">
            <button className="button" onClick={() => setEditing(true)}>Edit</button>
          </div>
          <div className="button-border red-gradient">
            <button className="button" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="ft-38">Profile</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="input-label" htmlFor="name">Name</label>
          <div className="input-border orange-gradient">
            <input
              id="name"
              className="input-text"
              name="name"
              type="text"
              value={form.name || ''}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="input-label mt-20" htmlFor="about">About</label>
          <div className="text-area-border orange-gradient mt-20">
            <textarea
              id="about"
              className="text-area ft-18"
              name="about"
              rows="10"
              value={form.about || ''}
              onChange={handleChange}
            />
          </div>
        </div>
        {fields.slice(1).map((f) => (
          <div className="form-group" key={f.name}>
            <label className="input-label mt-20" htmlFor={f.name}>{f.label}</label>
            <div className="input-border orange-gradient mt-20">
              <input
                id={f.name}
                className="input-text"
                name={f.name}
                type={f.type}
                value={form[f.name] || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        ))}
        <div className="flex mt-20">
          <div className="button-border purple-gradient">
            <button className="button" type="submit">Save</button>
          </div>
          <div className="button-border orange-gradient">
            <button className="button" type="button" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}
