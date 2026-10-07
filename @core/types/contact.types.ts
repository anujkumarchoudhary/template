import { Document, Types } from "mongoose";

/* ===================== SERVICE TYPE ===================== */
export interface IService {
  name: string;
}

/* ===================== ENQUIRY TYPE ===================== */
export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  website: string;
  services: IService[];
  description: string;
}
