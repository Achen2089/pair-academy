import React from 'react';
import Editor from '@monaco-editor/react';

interface EditorProps {
    height?: string;
    defaultLanguage?: string;
    defaultValue?: string;
}

const CodeEditor: React.FC<EditorProps> = ({ height = "90vh", defaultLanguage = "python", defaultValue = "print('Hello wordl')"}: EditorProps) => (
    <Editor
        height={height}
        defaultLanguage={defaultLanguage}
        defaultValue={defaultValue}
    />
);

export default CodeEditor;