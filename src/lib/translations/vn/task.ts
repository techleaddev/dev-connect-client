const taskTranslate = {
    title: 'Tiêu đề',
    createBtn: 'Tạo mới',
    description: 'Mô tả',
    name: 'Tên',
    tasks: 'công việc',
    code: 'Code',
    history: 'Lịch sử',
    document: 'Tài liệu',
    notification: 'Thông báo',
    empty: 'Không có bản ghi nào',
    comment: "Bình luận",
  };
  
  export type TaskTranslateType = typeof taskTranslate;
  
  export type TaskTranslateKeyType = keyof TaskTranslateType;
  
  export default taskTranslate;
  