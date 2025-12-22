import { z } from 'zod';

export const partnerSchema = z.object({
  _id: z.string(),
  businessInfos: z.object({
    rccm: z.string(),
    rcs: z.string(),
  }),
  contract: z.object({
    contractDate: z.string(),
    contractNumber: z.string(),
    contractType: z.string(),
    endDate: z.string(),
    startDate: z.string(),
  }),
  documentInfos: z.object({
    cni: z.string(),
    cmu: z.string(),
    sejour: z.string(),
  }),
  profession: z.object({
    diploma: z.string(),
    experience: z.string(),
    jobs: z.string(),
    speciality: z.string(),
  }),
  personalInfos: z.object({
    birthDay: z.string(),
    familySituation: z.string(),
    gender: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    locateDay: z.string(),
    nationality: z.string(),
  }),
});

export const documentSchema = z.object({
  _id: z.string(),
  name: z.string(),
  type: z.string(),
});

export const contractSchema = z.object({
  _id: z.string(),
  contractDate: z.string(),
  contractNumber: z.string(),
  contractType: z.string(),
  endDate: z.string(),
  startDate: z.string(),
});

export const professionSchema = z.object({
  _id: z.string(),
  diploma: z.string(),
  experience: z.string(),
  jobs: z.string(),
  speciality: z.string(),
});

export const businessSchema = z.object({
  _id: z.string(),
  rccm: z.string(),
  rcs: z.string(),
});

export const documentInfosSchema = z.object({
  _id: z.string(),
  cni: z.string(),
  cmu: z.string(),
  sejour: z.string(),
});

export const personalInfosSchema = z.object({
  _id: z.string(),
  birthDay: z.string(),
  familySituation: z.string(),
  gender: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  locateDay: z.string(),
  nationality: z.string(),
});

export const demandeSchema = z.object({
  _id: z.string(),
  description: z.string(),
  documents: z.array(documentSchema),
  name: z.string(),
  reference: z.string(),
  status: z.string(),
});
