import Button from 'src/components/Base/Button';
import { InputBasic } from 'src/components/Base/Input';
import { TextAreaNormal } from 'src/components/Base/TextArea';
import { TestTabWrapper } from './style';

const TestTab = () => {
  return (
    <TestTabWrapper>
      <div className="test_tab__header">
        <InputBasic value="http://hello.com/login" />
        <Button title="send" onClick={() => null} />
      </div>
      <div>
        <label>Request</label>
        <TextAreaNormal value='{ "email": "quyetthang@gmail.com", "password": "123"}' />
      </div>
      <div>
        <label>Response</label>
        <TextAreaNormal value='{ "success": true }' />
      </div>
    </TestTabWrapper>
  );
};

export default TestTab;
