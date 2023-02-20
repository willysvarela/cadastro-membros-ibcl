import { Td } from '@chakra-ui/react';
import React from 'react';

const MemberCell = () => {
  if (cell.column.id === 'photo_url') {
    return <img src={cell.value} alt="" />;
  }
  return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
};

export default MemberCell;
