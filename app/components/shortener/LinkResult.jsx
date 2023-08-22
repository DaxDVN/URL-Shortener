import { useActionData } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
const LinkResult = ({ shorten_key }) => {
  const [copied, setCopied] = useState(false);
  const warn = useActionData();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);
  return (
    <div className="result">
      <p>{typeof warn == "string" ? warn : shorten_key}</p>
      <CopyToClipboard text={shorten_key} onCopy={() => setCopied(true)}>
        <button
          className={copied ? "copied" : ""}
          disabled={typeof warn == "string"}
        >
          Copy to clipboard
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default LinkResult;
