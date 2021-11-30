import { memo, useMemo, useState, useEffect, FunctionComponent } from 'react';
import Select, { OptionTypeBase } from 'react-select';
import CopyField from 'src/components/Base/CopyField';
import { useAppSelector } from 'src/hooks/useAppSelector';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CodeSnippetWrapper } from './style';

interface IProp {
  method: string;
  host: string;
  endpoint: string;
  requestBody: object;
}

const CodeSnippet: FunctionComponent<IProp> = memo(
  ({ method, host, endpoint, requestBody }) => {
    const [snippetType, setSnippetType] = useState<OptionTypeBase>();
    const [snippet, setSnippet] = useState('');
    const snippets = useAppSelector(
      (state) => state.user.preferences?.snippets
    );
    const snippetOptions = useMemo(() => {
      // setSnippetType
      return snippets?.map((item) => ({ label: item.name, value: item._id }));
    }, [snippets]);

    useEffect(() => {
      setSnippet(
        snippets?.find((item) => item.isDefault === true)?.template || ''
      );
    }, [snippets]);

    useEffect(() => {
      if (snippetType) {
        setSnippet(
          snippets?.find((item) => item._id === snippetType.value)?.template ||
            ''
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [snippetType]);

    const template = useMemo(() => {
      return snippet
        .replaceAll("'$method'", method.toLowerCase())
        .replaceAll("'$url'", `${host || ''}${endpoint}`)
        .replaceAll("'$req'", String(requestBody || ''));
    }, [endpoint, host, method, requestBody, snippet]);

    return (
      <CodeSnippetWrapper>
        <Select
          value={snippetType}
          options={snippetOptions}
          styles={{ option: (styles) => ({ ...styles, color: '#000' }) }}
          onChange={(e) => setSnippetType(e)}
        />
        <CopyField
          value={template}
          className="copy-zone"
          display={
            <SyntaxHighlighter language="javascript" style={a11yDark}>
              {template}
            </SyntaxHighlighter>
          }
        />
      </CodeSnippetWrapper>
    );
  }
);

export default CodeSnippet;
