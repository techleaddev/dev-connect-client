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

// export type ITaskDetailRes = Omit<ITask, 'unitId'> & {
//   unitId: {
//     _id: string,
//   }
// }
export interface ITaskRes {
  _id: string;
  unitId: { _id: string; title: string };
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

export interface ITaskHistory {
  taskId: string;
  author: {
    _id: string;
    first_name: string;
    last_name: string;
  };
  docId: string;
  diff: {
    from: any;
    to: any;
  };
  createdAt: Date;
}
