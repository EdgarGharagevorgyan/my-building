// Type definitions
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
  contactPerson: string;
  phone: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: "input" | "select" | "list";
  rules?: any[];
  options?: { label: string; value: string }[];
}

export interface Apartment {
  number: string;
  family?: string;
  service?: string;
}

export interface Floor {
  apartments: Apartment[];
}

export interface Member {
  fullName?: string;
  age?: number;
  role?: string;
}

export interface FormValues {
  [key: string]: any;
  floors?: Floor[];
  members?: Member[];
  phone?: string;
  contactPerson?: string;
  partner?: string;
}

export interface DynamicFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: FormValues) => void;
  initialValues?: FormValues;
  mode?: "edit" | "add";
  title?: string;
  fields: FieldConfig[];
  families: Family[];
  services: Service[];
  partners: Partner[];
}
