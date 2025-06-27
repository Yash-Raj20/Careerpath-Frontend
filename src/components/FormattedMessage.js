import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiCopy, FiCheck } from "react-icons/fi";

const CodeBlock = ({ code, language = "javascript" }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded-lg overflow-hidden bg-[#0d1117] border border-gray-700 text-sm">
      {/* Copy Button */}
      <CopyToClipboard text={code} onCopy={handleCopy}>
        <button
          className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-800 text-white rounded-md hover:bg-gray-700 flex items-center gap-1"
          title="Copy code"
        >
          {copied ? (
            <>
              <FiCheck className="text-green-400" /> Copied
            </>
          ) : (
            <>
              <FiCopy /> Copy
            </>
          )}
        </button>
      </CopyToClipboard>

      {/* Code Renderer */}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          padding: "1rem",
          margin: 0,
          background: "transparent",
          fontSize: "0.875rem",
        }}
        showLineNumbers
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const FormattedMessage = ({ content }) => {
  // Split by code blocks (```language\ncode```)
  const blocks = content.split(/```/g);

  return (
    <div className="text-base space-y-4">
      {blocks.map((block, idx) => {
        const isCode = idx % 2 === 1;

        if (isCode) {
          const lines = block.trim().split("\n");
          const firstLine = lines[0];
          const isLang = /^[a-zA-Z]+$/.test(firstLine);
          const language = isLang ? firstLine : "javascript";
          const code = isLang ? lines.slice(1).join("\n") : block;

          return <CodeBlock key={idx} code={code} language={language} />;
        } else {
          return block
            .split("\n")
            .map((line, i) => (
              <p key={`${idx}-${i}`} className="text-gray-800 dark:text-gray-100 leading-relaxed">
                {line}
              </p>
            ));
        }
      })}
    </div>
  );
};

export default FormattedMessage;