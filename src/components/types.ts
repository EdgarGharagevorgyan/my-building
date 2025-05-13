import { Rule } from "antd/es/form";

export interface Building {
  id: string;
  name: string;
  address: string;
  floors: Floor[];
  services: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Floor {
  id: string;
  number: number;
  apartments: Apartment[];
}

export interface Apartment {
  id: string;
  number: number;
  family: string | null;
  service: string | null;
}


export interface Family {
  id: string;
  name: string;
  members: Member[];
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  id: string;
  fullName: string;
  age: number;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  partner: Partner;
}

export interface Partner {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
}

export interface Field {
  name: string;
  label: string;
  type: "text" | "select" | "list";
  rules?: Rule[];
  options?: { label: string; value: string }[];
}

export interface FormValues {
  [key: string]: any;
  floors?: Floor[];
  members?: Member[];
  partner?: string;
  phone?: string;
}

export interface DynamicFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: FormValues) => void;
  initialValues: FormValues;
  mode?: "add" | "edit";
  title?: string;
  fields: Field[];
  families: Family[];
  services: Service[];
  partners: Partner[];
}
