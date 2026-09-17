import { useState } from "react";

const EMAIL = "shaikh.zaid@northeastern.edu";

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="btn-primary w-full justify-center"
      aria-label="Copy email address"
    >
      <span key={copied ? "copied" : "copy"} className="swap flex items-center gap-2">
        {copied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <rect x="1" y="4" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4 4V2.5A1.5 1.5 0 015.5 1h6A1.5 1.5 0 0113 2.5v6A1.5 1.5 0 0111.5 10H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Copy email address
          </>
        )}
      </span>
    </button>
  );
};

export default CopyEmailButton;
