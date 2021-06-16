interface Issue {
  id?: any;
  title: string;
  description: string;
  projectName: string;
  priority: number;
  timestamps?: {
    createdOn?: string;
    updatedOn?: string;
  };
}
