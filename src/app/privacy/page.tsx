import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Pet Care Guides",
  description: "Privacy policy for Pet Care Guides. Learn how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-gray-400 mb-4">Last updated: June 2026</p>
      <div className="prose prose-invert max-w-none space-y-4">
        <h2>1. Information We Collect</h2>
        <p>We do not collect personal information directly. Our site uses Google AdSense, which may use cookies to serve personalized ads. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our sites and/or other sites on the Internet.</p>
        <h2>2. Cookies</h2>
        <p>Third-party vendors, including Google, use cookies to serve ads based on your prior visits. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-400 underline">Google Ads Settings</a>.</p>
        <h2>3. Contact</h2>
        <p>For privacy concerns, email us at contact@petcareguides.com.</p>
      </div>
    </div>
  );
}
