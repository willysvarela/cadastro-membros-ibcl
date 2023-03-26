/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { dateFormatToShow } from '../../utils/date';

function MemberCell({ cell }) {
  if (cell.column.id === 'name') {
    return <ImageCell cell={cell} />;
  }
  if (cell.column.id === 'birth') {
    return <Cell cell={cell} />;
  }
  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
}

function Cell({ cell }) {
  return <td>{dateFormatToShow(cell.value)}</td>;
}

function ImageCell({ cell }) {
  // console.log({ cell });
  const photoUrl = cell.row.cells.find(
    (item) => item.column.id === 'photo_url'
  ).value;
  return (
    <td>
      <div className="w-100 py-1">
        <div className="flex items-center">
          <div className="avatar">
            <div className="w-16 rounded">
              <img src={photoUrl} alt="" />
            </div>
          </div>
          <span className="ml-4">{cell.value}</span>
        </div>
      </div>
    </td>
  );
}

export default MemberCell;
