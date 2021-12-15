export interface ITask {
  _id: string;
  unitId: string;
  title: string;
  description: string;
  tags: string[];
  assignee: string;
  deadline?: Date;
  status: string;
}

export interface ITaskRes {
  _id: string;
  unitId: string;
  title: string;
  description: string;
  tags: Array<{ _id: string; title: string }>;
  assignee: { _id: string; first_name: string; last_name: string };
  deadline: Date;
  status: {
    _id: string;
    name: string;
    color: string;
  };
}
