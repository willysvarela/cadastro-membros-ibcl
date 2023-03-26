import React from 'react';

function Card({ img, title, description, buttonTitle, onClick }) {
  return (
    <button
      type="button"
      className="card card-side bg-base-100 shadow-xl"
      onClick={onClick}
    >
      {img && (
        <figure>
          <img src={img} alt="Shoes" />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
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
