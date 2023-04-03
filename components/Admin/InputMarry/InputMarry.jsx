/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';

function InputMarry({
  id,
  title,
  value,
  items,
  gender,
  disabled,
  onChange,
  onSelect
}) {
  const filtered = items.filter((item) => item.gender === gender);
  return (
    <div className="form-control">
      <div className="dropdown">
        <label htmlFor={id} className="label">
          {title}
        </label>
        <input
          id={id}
          type="input"
          className="input input-primary w-full"
          value={value}
          onChange={onChange}
          tabIndex={0}
          disabled={disabled}
        />
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full"
        >
          {filtered.map((option) => (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => onSelect(option)}
                alt={option.name}
              >
                {option.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InputMarry;
