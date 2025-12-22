export type tPartner = {
  _id?: string | null;
  reference?: string | null;
  personalInfos?: tPartnerPersonalInfos | null;
  businessInfos?: tPartnerBusinessInfos | null;
  address?: tAdresse | null;
  profession?: tProfession | null;
  nationality?: tNationality | null;
  contract?: tContract | null;
  token?: string | null;
  password?: string | null;
  documentInfos?: tPartnerDocumentInfos | null;
  realization?: Array<tRealization> | null;
  profFile?: {
    fileUrl?: string | null;
    name?: string | null;
  };
  document?: Array<tDocument> | null;
  isFirstLogin?: boolean | null;
  isActive?: boolean | null;
  isLogged?: boolean | null;
  createdAt?: string | null;
  updateAt?: string | null;
};

export type tRealization = {
  fileUrl?: string | null;
  fileName?: string | null;
  description?: string | null;
};

export type tPartnerBusinessInfos = {
  rccm?: string | null;
  rcs?: string | null;
};

export type tPartnerDocumentInfos = {
  cni?: string | null;
  cmu?: string | null;
  sejour?: string | null;
};

export type tProfession = {
  jobs?: string | null;
  speciality?: string | null;
  diploma?: tDiploma | null;
  experience?: tExperience | null;
  availability?: tAvailability | null;
};

export type tNationality = string;

export type tAvailability = 'Indisponible' | 'Disponible' | 'En recherche';

export type tRenumeration =
  | 'Par semaine'
  | 'Par quinzaine'
  | 'Par mois'
  | 'Par opération';

export type tTypeOfContract =
  | 'Collaborateur freelance'
  | 'Partenariat'
  | 'Contrat de professionnalisation'
  | 'CDD'
  | 'CDI'
  | 'Autre';

export type tDiploma =
  | 'Bac+5'
  | 'Bac+4'
  | 'Bac+3'
  | 'Bac+2'
  | 'Bac+1'
  | 'Bac'
  | 'Master+5'
  | 'Master+4'
  | 'Master+3'
  | 'Master+2'
  | 'Master+1'
  | 'Master'
  | 'Doctorat+5'
  | 'Doctorat+4'
  | 'Doctorat+3'
  | 'Doctorat+2'
  | 'Doctorat+1'
  | 'Doctorat'
  | 'Licence'
  | 'CAP'
  | 'CAPES'
  | 'CAPM'
  | 'CAPME'
  | 'CAPMF'
  | 'CAPMO'
  | 'CAPMP'
  | 'CAPMS'
  | 'CAPMT'
  | 'CPAM'
  | 'CPAS'
  | 'CPAE'
  | 'CPAF'
  | 'CPAO'
  | 'CPAP'
  | 'CPAS'
  | 'CPAT'
  | 'CPE'
  | 'CPF'
  | 'CPO'
  | 'CPP'
  | 'CPS'
  | 'CPT'
  | 'DEA'
  | 'DEAP'
  | 'DEAS'
  | 'DEAT'
  | 'DED'
  | 'DEDP'
  | 'DEDS'
  | 'DEDT'
  | 'DES'
  | 'DET'
  | 'DMD'
  | 'DMDP'
  | 'DMDS'
  | 'DMDT'
  | 'DMS'
  | 'DMT'
  | 'DPE'
  | 'DPF'
  | 'DPO'
  | 'DPP'
  | 'DPS'
  | 'DPT'
  | 'DRE'
  | 'DRF'
  | 'DRO'
  | 'DRP'
  | 'DRS'
  | 'DRT'
  | 'DSE'
  | 'DSF'
  | 'DSO'
  | 'DSP'
  | 'DSS'
  | 'DST'
  | 'DTE'
  | 'DTF'
  | 'DTO'
  | 'DTP'
  | 'DTS'
  | 'DTT'
  | 'DVM'
  | 'DVP'
  | 'DVS'
  | 'DVT'
  | 'EAP'
  | 'EAS'
  | 'EAT'
  | 'EDP'
  | 'EDS'
  | 'EDT'
  | 'EED'
  | 'EEDP'
  | 'EEDS'
  | 'EEDT'
  | 'EES'
  | 'EET'
  | 'EMD'
  | 'EMDP'
  | 'EMDS'
  | 'EMDT'
  | 'EMS'
  | 'EMT'
  | 'EPE'
  | 'EPF'
  | 'EPO'
  | 'EPP'
  | 'EPS'
  | 'EPT'
  | 'ERE'
  | 'ERF'
  | 'ERO'
  | 'ERP'
  | 'ERS'
  | 'ERT'
  | 'ESE'
  | 'ESF'
  | 'ESO'
  | 'ESP'
  | 'ESS'
  | 'EST'
  | 'ETE'
  | 'ETF'
  | 'ETO';

export type tExperience =
  | '0 années'
  | '1 année'
  | '2 années'
  | '3 années'
  | '4 années'
  | '5 années'
  | '6 années'
  | '7 années'
  | '8 années'
  | '9 années'
  | '10 années'
  | '11 années'
  | '12 années'
  | '13 années'
  | '14 années'
  | '15 années'
  | '16 années'
  | '17 années'
  | '18 années'
  | '19 années'
  | '20 années';

export type tContract = {
  typeOfContract: tTypeOfContract | null;
  referenceContract: string;
  remuneration: tRenumeration | null;
};

export type tDocument = {
  _id: string;
  name?: string | null;
  fileUrl?: Array<{
    filename?: string | null;
    url?: string | null;
  }>;
  status: string;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type tPartnerPersonalInfos = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  gender?: string | null;
  birthDay?: string | null;
  locateDay?: string | null;
  familySituation?: tSituation | null;
  numberOfChildren?: string | null;
};

export type tSituation = 'Marié' | 'Célibataire' | 'Vie maritale';

export type tAdresse = {
  city?: string | null;
  zipCode?: string | null;
  country?: string | null;
  street?: string | null;
  municipality?: string | null;
  villa?: string | null;
};

export type tPartnerStore = {
  partners: tPartner[] | [];
  partner: tPartner | null;
  formPartner: tPartner | null;
  filterPartner: tPartner | null;

  setPartnerStore: <K extends keyof Omit<tPartnerStore, 'setPartnerStore'>>(
    key: K,
    value: tPartnerStore[K]
  ) => void;
};
