"use client";

import { useState } from "react";
import { IoIosCheckmark } from "react-icons/io";
import { IoClipboardOutline } from "react-icons/io5";

interface CopyButtonProps {
  code: string;
}

export const CopyButton = ({ code }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div
      onClick={handleCopy}
      className="size-6 flex items-center justify-center"
    >
      {copied ? (
        <IoIosCheckmark className="size-6" />
      ) : (
        <IoClipboardOutline className="size-4" />
      )}
    </div>
  );
};
