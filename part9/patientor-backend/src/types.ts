import { z } from 'zod';
import { newPatientSchema } from './utils';

export interface Diagnosis {
  code: string
  name: string
  latin?: string // optional
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
}

export type NonSsnPatient = Omit<Patient, 'ssn'>;

export type NewPatient = z.infer<typeof newPatientSchema>;