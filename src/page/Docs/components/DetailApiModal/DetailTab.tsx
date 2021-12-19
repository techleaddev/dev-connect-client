import Button from 'src/components/Base/Button';
import { InputNormal } from 'src/components/Base/Input';
import { TextAreaNormal } from 'src/components/Base/TextArea';
import { DetailTabWrapper } from './style';

const DetailTab = () => {
  return (
    <DetailTabWrapper>
      <Button title="Edit" onClick={() => null} />
      <div style={{ marginTop: 8, display: 'grid', gap: 8 }}>
        <InputNormal value="Đăng nhập" title="Tiêu đề" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 12,
          }}
        >
          <InputNormal value="Post" title="Phưng thức" />
          <InputNormal value="http://hello.com" title="Host" />
          <InputNormal value="/login" title="Endpoint" />
        </div>
        <InputNormal value="Phạm Quyết Thắng" title="Thành viên" />
        <TextAreaNormal value="Api đăng nhập" title="Mô tả" />
      </div>
    </DetailTabWrapper>
  );
};

export default DetailTab;
