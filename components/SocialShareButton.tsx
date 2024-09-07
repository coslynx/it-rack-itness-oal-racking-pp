"use client";

import { useState } from "react";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

interface SocialShareButtonProps {
  title: string;
  url: string;
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    });
  };

  return (
    <div className="flex gap-4">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-gray-900 transition duration-200 ease-in-out"
      >
        <FaTwitter size={24} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-gray-900 transition duration-200 ease-in-out"
      >
        <FaFacebook size={24} />
      </a>
      <a
        href={`https://www.instagram.com/share?url=${encodeURIComponent(
          url
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-gray-900 transition duration-200 ease-in-out"
      >
        <FaInstagram size={24} />
      </a>
      <button
        onClick={handleCopy}
        className="text-gray-600 hover:text-gray-900 transition duration-200 ease-in-out"
      >
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
};

export default SocialShareButton;