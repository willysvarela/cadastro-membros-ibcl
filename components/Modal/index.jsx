import {
  Modal as ChakraModal,
  ModalContent,
  ModalOverlay
} from '@chakra-ui/react';
import React from 'react';

function Modal({ isOpen, onClose, children, ...props }) {
  return (
    <ChakraModal isOpen={isOpen} size="6xl" onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent className="p-4">{children}</ModalContent>
    </ChakraModal>
  );
}

export default Modal;
