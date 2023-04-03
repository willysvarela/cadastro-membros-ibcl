import React from 'react';

function Card({ img, title, description, buttonTitle, onClick, className }) {
  return (
    <button
      type="button"
      className={`card bg-base-100 shadow-xl w-60 ${className}`}
      onClick={onClick}
    >
      {img && (
        <figure>
          <img src={img} alt="Shoes" className="" />
        </figure>
      )}
      <div className="card-body w-full text-center">
        <h2 className="card-title justify-center">{title}</h2>
        <p>{description}</p>
        <div className="card-actions">
          {buttonTitle && (
            <button type="button" className="btn btn-primary" onClick={onClick}>
              {buttonTitle}
            </button>
          )}
        </div>
      </div>
    </button>
  );
}

export default Card;
