export interface Template {
  _id: string;
  title: string;
  description: string;
  targetNumber: number;
  userId: string;
  required: boolean;
  bookMark: boolean;
  deadline: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Form {
  _id: string;
  title: string;
  type: string;
  select: string[];
  order: number;
  plural: boolean;
  bookMark: boolean;
  templateId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface templateOption {
  length: number;
  _id: string;
  quater: string[];
  formId: string;
  templateId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Logic {
  _id: string;
  type: strung;
  selector: string[];
  formId: string;
  appliedFormId: string;
  templateId: string;
  createdAt: Date;
  updatedAt: Date;
}
