import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
const LinkResult = ({ shorten_key, domain }) => {
  let key = domain + shorten_key;
  let disabled = false;
  if (shorten_key == "invalidURL") {
    key = "Please enter a valid URL";
    disabled = true;
  }
  if (shorten_key == "maxURL") {
    key = "You just can create 30 short-url. Please delete someone else to create more";
    disabled = true;
  }

  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);
  return (
    <div className="result">
      <p>{shorten_key ? key : "Your link will be here"}</p>
      <CopyToClipboard text={key} onCopy={() => setCopied(true)}>
        <button
          className={copied ? "copied" : ""}
          disabled={shorten_key == "" || disabled}
        >
          Copy to clipboard
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default LinkResult;
