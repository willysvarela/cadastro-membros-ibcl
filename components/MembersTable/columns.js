const COLUMNS_ORDER = [
  'name',
  'id',
  'birth',
  'gender',
  'civil_state',
  'father_name',
  'mother_name',
  'address',
  'district',
  'phone',
  'email',
  'social_network',
  'how_join',
  'favorite_reunion',
  'has_ministery',
  'ministery',
  'intended_ministeries',
  'department',
  'ministery_leader',
  'has_go',
  'go_leader',
  'health_skills',
  'teach_skills',
  'social_skills',
  'maintenance_skills',
  'other_skills',
  'photo_url',
  'courses'
];

const COLUMNS = [
  {
    Header: 'ID',
    accessor: 'id',
    disabled: true
  },
  {
    Header: 'Nome',
    accessor: 'name'
  },
  {
    Header: 'Data de Nascimento',
    accessor: 'birth',
    type: 'date'
  },
  {
    Header: 'Sexo',
    accessor: 'gender'
  },
  {
    Header: 'Estado Civil',
    accessor: 'civil_state'
  },
  {
    Header: 'Nome do Pai',
    accessor: 'father_name'
  },
  {
    Header: 'Nome da Mãe',
    accessor: 'mother_name'
  },
  {
    Header: 'Endereço',
    accessor: 'address'
  },
  {
    Header: 'Rua',
    accessor: 'district'
  },
  {
    Header: 'Telefone',
    accessor: 'phone'
  },
  {
    Header: 'Email',
    accessor: 'email',
    type: 'email'
  },
  {
    Header: 'Rede Social',
    accessor: 'social_network'
  },
  {
    Header: 'Como se tornou membro',
    accessor: 'how_join'
  },
  {
    Header: 'Culto Preferido',
    accessor: 'favorite_reunion'
  },
  {
    Header: 'Tem Ministério?',
    accessor: 'has_ministery',
    type: 'checkbox'
  },
  {
    Header: 'Ministério',
    accessor: 'ministery'
  },
  {
    Header: 'Ministérios de Interesse',
    accessor: 'intended_ministeries'
  },
  {
    Header: 'Departamento',
    accessor: 'department'
  },
  {
    Header: 'Líder de Ministério',
    accessor: 'ministery_leader'
  },
  {
    Header: 'Tem GO?',
    accessor: 'has_go',
    type: 'checkbox'
  },
  {
    Header: 'Líder de GO',
    accessor: 'go_leader'
  },
  {
    Header: 'Habilidades em Saúde',
    accessor: 'health_skills'
  },
  {
    Header: 'Habilidades em Ensino',
    accessor: 'teach_skills'
  },
  {
    Header: 'Habilidades Sociais',
    accessor: 'social_skills'
  },
  {
    Header: 'Habilidades em Manutenção',
    accessor: 'maintenance_skills'
  },
  {
    Header: 'Outras Habilidades',
    accessor: 'other_skills'
  },
  {
    Header: 'Cursos',
    accessor: 'courses'
  },
  {
    Header: 'Foto',
    accessor: 'photo_url'
  }
];

export { COLUMNS, COLUMNS_ORDER };
