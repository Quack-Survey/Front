export interface Template {
  _id: string;
  title: string;
  description: string;
  targetNumber: number;
  userId: string;
  bookMark: boolean;
  deadLine: Date;
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
