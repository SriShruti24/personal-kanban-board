import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Trash2, Edit2, Paperclip } from 'lucide-react';

const TaskCard = ({ task, index, onDelete, onEdit }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card ${snapshot.isDragging ? 'is-dragging' : ''}`}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <div className="task-header">
            <h3 className="task-title">{task.title}</h3>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button className="task-delete" onClick={() => onEdit(task)} title="Edit">
                <Edit2 size={16} />
              </button>
              <button className="task-delete" onClick={() => onDelete(task.id)} title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          <p className="task-desc">{task.description}</p>
          
          <div className="task-badges">
            <span className={`badge badge-priority-${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
            <span className={`badge badge-cat-${task.category.toLowerCase()}`}>
              {task.category}
            </span>
          </div>
          
          {task.attachment && (
            <div className="task-attachment">
              <Paperclip size={14} />
              <span>{task.attachment.name}</span>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
