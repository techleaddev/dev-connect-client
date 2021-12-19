import React, { ChangeEvent, FunctionComponent } from 'react';
import { BoxWithHeader } from 'src/components/Base/Box';
import DatePicker from 'src/components/Base/DatePicker';
import { InputNormal } from 'src/components/Base/Input';
import { SelectFieldNormal } from 'src/components/Base/SelectField';
import { TextAreaNormal } from 'src/components/Base/TextArea';
import { SELECT_OPTION } from 'src/lib/constants/options';
import { IDocSelectOption } from 'src/services/doc/types';
import { AddTaskModalWrapper } from '../style';

export interface IDetailTaskData {
  unit?: IDocSelectOption;
  title: string;
  description: string;
  tags?: SELECT_OPTION[];
  assignee?: SELECT_OPTION;
  deadline?: Date;
  status?: SELECT_OPTION;
}
export type DetailTaskDataKey = keyof IDetailTaskData;
interface IProps {
  data: IDetailTaskData;
  docOption: SELECT_OPTION[];
  handleChangeApi: (value: IDocSelectOption) => void;
  handleChangeForm: (event: ChangeEvent<any>) => void;
  statusOption: SELECT_OPTION[];
  onChangeDeadline: (value: Date) => void;
  tagsOption: SELECT_OPTION[];
  handleChangeAssignee(value: SELECT_OPTION): void;
  handleChangeStatus(value: SELECT_OPTION): void;
  handleChangeTag(value: SELECT_OPTION[]): void;
}

const DetailForm: FunctionComponent<IProps> = ({
  data,
  docOption,
  handleChangeApi,
  handleChangeForm,
  statusOption,
  onChangeDeadline,
  tagsOption,
  handleChangeAssignee,
  handleChangeStatus,
  handleChangeTag,
}) => {
  return (
    <AddTaskModalWrapper>
      <SelectFieldNormal
        title="Api"
        name="unitId"
        value={data.unit}
        options={docOption}
        onChange={handleChangeApi}
      />
      <InputNormal
        name="title"
        title="Title"
        value={data.title}
        onChange={handleChangeForm}
      />
      <div className="task_group">
        <SelectFieldNormal
          title="Assignee"
          name="assignee"
          value={data.assignee}
          options={data.unit?.members}
          onChange={handleChangeAssignee}
        />
        <SelectFieldNormal
          name="status"
          title="Status"
          options={statusOption}
          value={data.status}
          onChange={handleChangeStatus}
        />
        <DatePicker
          title="Deadline"
          value={data.deadline}
          onChange={onChangeDeadline}
        />
      </div>
      <SelectFieldNormal
        name="tag"
        title="Tags"
        value={data.tags || []}
        options={tagsOption}
        onChange={handleChangeTag}
        closeMenuOnSelect={false}
        isMulti
      />

      <TextAreaNormal
        name="description"
        title="Description"
        value={data.description}
        onChange={handleChangeForm}
        // fullSize
      />
    </AddTaskModalWrapper>
  );
};

export default DetailForm;
