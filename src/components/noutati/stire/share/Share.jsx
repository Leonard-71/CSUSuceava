import React, { useState } from "react";
import { FaInstagram, FaTwitter, FaFacebook, FaLink } from "react-icons/fa";
import "./Share.scss";

const Share = () => {
  const [copied, setCopied] = useState(false);

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`);
  };
  
  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`);
  };

  const shareOnInstagram = () => {
    window.open("https://www.instagram.com"); 
  };
  
  const copyLinkToClipboard = () => {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = window.location.href;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    setCopied(true); 
  };

  return (
    <div className="btn_wrap">
      <span>Share</span>
      <div className="container">
        <FaFacebook className="icon-media facebook" title="Facebook" onClick={shareOnFacebook} />
        <FaTwitter className="icon-media twitter" title="Twitter" onClick={shareOnTwitter} />
        <FaInstagram className="icon-media instagram" title="Instagram" onClick={shareOnInstagram} />
        <FaLink className="icon-media copy-link" title={copied ? "Copied!" : "Copy Link"} onClick={copyLinkToClipboard} />
      </div>
    </div>
  );
};

export default Share;
