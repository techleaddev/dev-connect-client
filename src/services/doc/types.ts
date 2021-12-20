import { METHOD_API } from 'src/lib/constants';
import { REQUEST_TYPE, SELECT_OPTION } from 'src/lib/constants/options';

export type IDocSelectOption = SELECT_OPTION & {
  members: SELECT_OPTION[];
};
export interface IDocStore {
  docSelect: Array<IDocSelectOption>;
}

export interface IGetListDocSelectRes {
  _id: string;
  title: string;
  members: Array<{ id_member: string; name: string }>;
}

export interface IRequest {
  field: string;
  type: string;
  is_require: boolean;
  root: boolean;
  child: string;
}

interface IStatus {
  name: string;
  code: number;
  description: string;
}

export default interface IDoc {
  _id: string;
  title: string;
  method: METHOD_API;
  host: string;
  endpoint: string;
  requestType: REQUEST_TYPE;
  requestBody: object;
  responseType: 'json' | 'text' | 'key_value';
  responseBody: object;
  status: IStatus[];
  description: string;
  members: Array<{
    id_member: string;
    name: string;
  }>;
}

export type ICreateDocReq = {
  docData: Omit<IDoc, '_id' | 'status' | 'extension'>;
  projectId: string;
};

export type IDocEditData = Omit<IDoc, '_id' | 'projectId' | 'members'>;
export interface IEditDocReq {
  docId: string;
  data: IDocEditData;
}

export interface IDocHistory {
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
