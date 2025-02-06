import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';

interface CodeEditorProps {
  language?: string;
  theme?: 'vs-dark' | 'light';
  defaultValue?: string;
  onRun?: (code: string) => void;
}

export default function CodeEditor({
  language = 'javascript',
  theme = 'vs-dark',
  defaultValue = '// Start coding here...',
  onRun
}: CodeEditorProps) {
  const [code, setCode] = useState(defaultValue);
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    if (onRun) {
      onRun(code);
    }
  };

  const handleReset = () => {
    setCode(defaultValue);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Language: {language}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-2 text-gray-400 hover:text-white rounded transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-gray-400 hover:text-white rounded transition-colors"
            title="Reset code"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={handleRun}
            className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            <Play className="h-4 w-4" />
            Run
          </button>
        </div>
      </div>
      <Editor
        height="400px"
        language={language}
        theme={theme}
        value={code}
        onChange={(value) => setCode(value || '')}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
      />
    </div>
  );
}