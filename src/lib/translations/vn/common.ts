const commonTranslate = {
  close: 'Đóng',
  done: 'Hoàn tất',
  create: 'Tạo mới',
  editStatus: 'Sửa trạng thái',
  editProfile: 'Sửa thông tin',
  preferences: 'Tùy chọn',
  logout: 'Đăng xuất',
  dashboard: 'Chung',
  filter: 'Bộ lọc',
  project: 'Dự án',
  snippet: 'Code mẫu',
};

export type CommonTranslateType = typeof commonTranslate;

export type CommonTranslateKeyType = keyof CommonTranslateType;

export default commonTranslate;
