import { Rule } from "antd/es/form";

export interface Family {
  id: string;
  name: string;
}

export interface Service {
  id: string;
  name: string;
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

export interface Apartment {
  number: string;
  family: string;
  service: string;
}

export interface Floor {
  apartments: Apartment[];
}

export interface Member {
  fullName: string;
  age: number;
  role: string;
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
