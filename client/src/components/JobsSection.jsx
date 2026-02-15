import { useState, useEffect } from 'react';
import { jobsService } from '../services/jobs';
import DataTable from './DataTable';

const EMPTY_JOB = {
  name: '', role: '', description: '',
  dateStarted: '', dateEnded: '', details: { list: [] },
};

const columns = [
  { key: 'name', label: 'Company' },
  { key: 'role', label: 'Role' },
  { key: 'dateStarted', label: 'Started' },
  { key: 'dateEnded', label: 'Ended' },
];

export default function JobsSection() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState(EMPTY_JOB);
  const [detailInputs, setDetailInputs] = useState(['']);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await jobsService.getAll();
      setJobs(data);
    } catch {
      setJobs([]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDetailChange = (index, value) => {
    const updated = [...detailInputs];
    updated[index] = value;
    setDetailInputs(updated);
  };

  const addDetail = () => setDetailInputs([...detailInputs, '']);

  const handleEdit = (job) => {
    setForm(job);
    setDetailInputs(job.details?.list || ['']);
    setEditing(job.id);
    setShowForm(true);
  };

  const handleCreate = () => {
    setForm(EMPTY_JOB);
    setDetailInputs(['']);
    setEditing(null);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const data = { ...form, details: { list: detailInputs.filter(Boolean) } };
    try {
      if (editing) {
        await jobsService.update(editing, data);
      } else {
        await jobsService.create(data);
      }
      setShowForm(false);
      await loadJobs();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await jobsService.delete(id);
      await loadJobs();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex between">
        <h2>Jobs</h2>
        {!showForm && (
          <div className="button-border purple-gradient">
            <button className="button" onClick={handleCreate}>Add New Job</button>
          </div>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-40">
          <h3>{editing ? 'Edit Job' : 'New Job'}</h3>
          {['name', 'role', 'description', 'dateStarted', 'dateEnded'].map((field) => (
            <div className="form-group" key={field}>
              <label className="input-label" htmlFor={field}>{field}</label>
              <div className="input-border orange-gradient">
                <input
                  id={field}
                  className="input-text"
                  name={field}
                  type={field.startsWith('date') ? 'date' : 'text'}
                  value={form[field] || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          ))}
          <div className="form-group">
            <label className="input-label">Details</label>
            {detailInputs.map((detail, i) => (
              <div className="input-border orange-gradient mt-20" key={i}>
                <input
                  className="input-text"
                  value={detail}
                  onChange={(e) => handleDetailChange(i, e.target.value)}
                />
              </div>
            ))}
            <div className="button-border orange-gradient mt-20">
              <button className="button small-button" type="button" onClick={addDetail}>+ Detail</button>
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

      {jobs.length > 0 && (
        <DataTable columns={columns} data={jobs} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}
