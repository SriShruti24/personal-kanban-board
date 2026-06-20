import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { X, Upload } from 'lucide-react';

const priorityOptions = [
  { value: 'Low', label: 'Low Priority' },
  { value: 'Medium', label: 'Medium Priority' },
  { value: 'High', label: 'High Priority' }
];

const categoryOptions = [
  { value: 'Bug', label: 'Bug' },
  { value: 'Feature', label: 'Feature' },
  { value: 'Enhancement', label: 'Enhancement' }
];

const customSelectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderColor: 'rgba(255,255,255,0.1)',
    color: 'white',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#1a1d29',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#262a3b' : 'transparent',
    color: 'white',
  }),
  singleValue: (base) => ({
    ...base,
    color: 'white',
  })
};

const TaskModal = ({ isOpen, onClose, onSave, existingTask = null }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(priorityOptions[0]);
  const [category, setCategory] = useState(categoryOptions[1]);
  const [attachment, setAttachment] = useState(null);
  const [fileError, setFileError] = useState('');

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title || '');
      setDescription(existingTask.description || '');
      setPriority(priorityOptions.find(p => p.value === existingTask.priority) || priorityOptions[0]);
      setCategory(categoryOptions.find(c => c.value === existingTask.category) || categoryOptions[1]);
      setAttachment(existingTask.attachment || null);
    } else {
      setTitle('');
      setDescription('');
      setPriority(priorityOptions[0]);
      setCategory(categoryOptions[1]);
      setAttachment(null);
    }
  }, [existingTask, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError('');
    if (file) {
      const validTypes = ['application/pdf'];
      const isValidImage = file.type.startsWith('image/');
      if (!isValidImage && !validTypes.includes(file.type)) {
        setFileError('Invalid file format. Please upload an image or PDF.');
        setAttachment(null);
        return;
      }
      const url = URL.createObjectURL(file);
      setAttachment({ name: file.name, url, type: file.type });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: existingTask?.id,
      title,
      description,
      priority: priority.value,
      category: category.value,
      status: existingTask?.status || 'To Do',
      attachment
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{existingTask ? 'Edit Task' : 'Create Task'}</h2>
          <button className="modal-close" onClick={onClose}><X size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              className="form-control" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Task Title"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea 
              className="form-control" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Task Description"
              rows={3}
            />
          </div>
          
          <div className="form-group">
            <label>Priority</label>
            <Select 
              value={priority}
              onChange={setPriority}
              options={priorityOptions}
              styles={customSelectStyles}
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <Select 
              value={category}
              onChange={setCategory}
              options={categoryOptions}
              styles={customSelectStyles}
            />
          </div>
          
          <div className="form-group">
            <label>Attachment</label>
            <input 
              type="file" 
              id="file-upload" 
              style={{ display: 'none' }} 
              onChange={handleFileChange}
              accept="image/*,.pdf"
            />
            <label htmlFor="file-upload" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <Upload size={16} /> Upload File
            </label>
            {fileError && <div className="error-message" style={{ color: 'var(--danger-color)', fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: 600 }}>{fileError}</div>}
            {attachment && (
              <div className="file-upload-preview">
                {attachment.type?.startsWith('image/') && (
                  <img src={attachment.url} alt="Preview" />
                )}
                <span>{attachment.name}</span>
              </div>
            )}
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Save Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
