export interface DashboardStatusDatas {
  complateData: {
    createdAt: string;
    responses: {
      order: number;
      question: string[];
      response: string[];
      title: string;
      type: "text" | "select";
    }[];
    templateId: string;
    updatedAt: string;
    _id: string;
  }[];
  templeteData: {
    bookmark: boolean;
    createdAt: string;
    deadline: string | null;
    description: string;
    targetNumber: number;
    title: string;
    updatedAt: string;
    _id: string;
  };
}

export interface DashboardResultDatas {
  order: number;
  question: string[];
  response: [string, number][] | [index: string][];
  title: string;
  type: "text" | "select";
}
