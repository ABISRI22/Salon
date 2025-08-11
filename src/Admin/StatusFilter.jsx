import React from 'react';
import './StatusFilter.css';

const StatusFilter = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'today', label: 'Today' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'pending', label: 'Pending' },
    { id: 'cancelled', label: 'Cancelled' },
    { id: 'all', label: 'All' }
  ];

  return (
    <div className="filter-container">
      {filters.map(filter => (
        <button
          key={filter.id}
          className={`filter-button ${activeFilter === filter.id ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;