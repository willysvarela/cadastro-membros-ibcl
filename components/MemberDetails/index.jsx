import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import React from 'react';
import Modal from '../Modal';

import MemberDetailsData from './MemberDetailsData';
import MemberPhotosData from './MemberPhotosData';

function MemberDetails({ isOpen, member, onClose }) {
  return (
    <Modal isOpen={isOpen} size="6xl" onClose={onClose}>
      <Tabs size="lg">
        <TabList>
          <Tab>Dados do Membro</Tab>
          <Tab>Fotos do Membro</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MemberDetailsData member={member} onClose={onClose} />
          </TabPanel>
          <TabPanel>
            <MemberPhotosData member={member} onClose={onClose} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Modal>
  );
}

export default MemberDetails;
