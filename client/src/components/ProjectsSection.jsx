import { useState, useEffect } from 'react';
import { projectsService } from '../services/projects';
import { excludeIdentifierFields, saveEntity } from '../utils/entityForm';
import DataTable from './DataTable';

const EMPTY_PROJECT = {
  name: '', description: '', githubLink: '',
  demoLink: '', imageLink: '', tags: { list: [] },
};

const columns = [
  { key: 'name', label: 'Project' },
  {
    key: 'githubLink',
    label: 'Github Link',
    className: 'cell-link',
    render: (val) => <a href={val}>{val}</a>,
  },
  {
    key: 'demoLink',
    label: 'Demo Link',
    className: 'cell-link',
    render: (val) => <a href={val}>{val}</a>,
  },
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(EMPTY_PROJECT);
  const [tagInputs, setTagInputs] = useState(['']);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await projectsService.getAll();
      setProjects(data);
    } catch {
      setProjects([]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTagChange = (index, value) => {
    const updated = [...tagInputs];
    updated[index] = value;
    setTagInputs(updated);
  };

  const addTag = () => setTagInputs([...tagInputs, '']);

  const removeTag = (index) => setTagInputs(tagInputs.filter((_, i) => i !== index));

  const handleEdit = (project) => {
    setForm(project);
    setTagInputs(project.tags?.list || ['']);
    setEditing(project.id);
    setShowForm(true);
  };

  const handleCreate = () => {
    setForm(EMPTY_PROJECT);
    setTagInputs(['']);
    setEditing(null);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const projectFields = excludeIdentifierFields(form);
    const projectPayload = { ...projectFields, tags: { list: tagInputs.filter(Boolean) } };
    await saveEntity({
      service: projectsService,
      entityId: editing,
      fields: projectPayload,
      onSuccess: async () => {
        setShowForm(false);
        await loadProjects();
      },
      onError: setError,
    });
  };

  const handleDelete = async (id) => {
    try {
      await projectsService.delete(id);
      await loadProjects();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="ft-38">Projects</h1>

      {error && <p className="error-message">{error}</p>}

      {projects.length > 0 && (
        <DataTable columns={columns} data={projects} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {!showForm && (
        <div className="button-border purple-gradient mt-20">
          <button className="button" onClick={handleCreate}>Add New Project</button>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-40">
          <h3>{editing ? 'Edit Project' : 'New Project'}</h3>
          {['name', 'description', 'githubLink', 'demoLink', 'imageLink'].map((field) => (
            <div className="form-group" key={field}>
              <label className="input-label" htmlFor={field}>{field}</label>
              <div className="input-border orange-gradient">
                <input
                  id={field}
                  className="input-text"
                  name={field}
                  type={field.endsWith('Link') ? 'url' : 'text'}
                  value={form[field] || ''}
                  onChange={handleChange}
                  required={field === 'name'}
                />
              </div>
            </div>
          ))}
          <div className="form-group">
            <label className="input-label">Tags</label>
            {tagInputs.map((tag, i) => (
              <div className="flex mt-20" key={i}>
                <div className="input-border orange-gradient">
                  <input
                    className="input-text"
                    value={tag}
                    onChange={(e) => handleTagChange(i, e.target.value)}
                  />
                </div>
                <div className="button-border red-gradient">
                  <button className="button small-button" type="button" onClick={() => removeTag(i)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="button-border orange-gradient mt-20">
              <button className="button small-button" type="button" onClick={addTag}>+ Tag</button>
            </div>
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

    </div>
  );
}
