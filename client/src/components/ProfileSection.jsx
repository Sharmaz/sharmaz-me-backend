import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { profilesService } from '../services/profiles';

const EMPTY_PROFILE = {
  name: '', profilePic: '', about: '', blog: '',
  github: '', linkedIn: '', twitter: '', resume: '',
};

export default function ProfileSection() {
  const { user } = useAuth();
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

  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'profilePic', label: 'Profile Pic URL', type: 'text' },
    { name: 'blog', label: 'Blog URL', type: 'text' },
    { name: 'github', label: 'Github URL', type: 'text' },
    { name: 'linkedIn', label: 'LinkedIn URL', type: 'text' },
    { name: 'twitter', label: 'Twitter URL', type: 'text' },
    { name: 'resume', label: 'Resume URL', type: 'text' },
  ];

  if (!editing && !profile) {
    return (
      <div>
        <h2>Profile</h2>
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
        <h2>Profile</h2>
        {fields.map((f) => (
          <p key={f.name}><strong>{f.label}:</strong> {profile[f.name]}</p>
        ))}
        <p><strong>About:</strong> {profile.about}</p>
        <div className="flex">
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
      <h2>{profile ? 'Edit Profile' : 'Create Profile'}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        {fields.map((f) => (
          <div className="form-group" key={f.name}>
            <label className="input-label" htmlFor={f.name}>{f.label}</label>
            <div className="input-border purple-gradient">
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
        <div className="form-group">
          <label className="input-label" htmlFor="about">About</label>
          <div className="text-area-border purple-gradient">
            <textarea
              id="about"
              className="text-area"
              name="about"
              value={form.about || ''}
              onChange={handleChange}
            />
          </div>
        </div>
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
