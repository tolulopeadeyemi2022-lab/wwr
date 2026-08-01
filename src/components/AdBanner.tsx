"use client";
import Script from "next/script";

export default function AdBanner() {
  return (
    <div className="my-8 flex justify-center">
      <div id="adsterra-banner-container">
        <Script id="adsterra-options" strategy="afterInteractive">
          {`
            atOptions = {
              'key' : 'b1c1f3851d587b5aa78cc9734b24c2da',
              'format' : 'iframe',
              'height' : 250,
              'width' : 300,
              'params' : {}
            };
          `}
        </Script>
        <Script
          src="https://www.highperformanceformat.com/b1c1f3851d587b5aa78cc9734b24c2da/invoke.js"
          strategy="afterInteractive"
        />
      </div>
    </div>
  );
}