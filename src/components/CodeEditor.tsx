import React, { useState, FC } from "react";
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
    onChange: (key: string, value: string) => void;
    language?: string;
    code?: string;
    theme?: string;
}

const CodeEditor: FC<CodeEditorProps> = ({onChange, language, code, theme}) => {
    const [value, setValue] = useState(code || "");

    const handleChange = (value: string | undefined) => {
        if (typeof value === 'string') {
            setValue(value);
            onChange("code", value);
        }
    }
    return (
        <div className = "overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
            <Editor
                height="85vh"
                width={`100%`}
                language={language || "python"}
                value={value}
                theme={theme}
                defaultValue="# Start Typing your Code here!"
                onChange={handleChange}
            />
        </div>
    );
};

export default CodeEditor;