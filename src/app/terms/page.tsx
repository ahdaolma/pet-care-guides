import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Pet Care Guides",
  description: "Terms of service for Pet Care Guides.",
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-gray-400 mb-4">Last updated: June 2026</p>
      <div className="prose prose-invert max-w-none space-y-4">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing pet-care-guides.vercel.app, you agree to these terms of service. If you do not agree, please do not use this site.</p>
        <h2>2. Content</h2>
        <p>All content on Pet Care Guides is provided for informational purposes only. We make no guarantees about accuracy or completeness.</p>
        <h2>3. Third-Party Links &amp; Ads</h2>
        <p>Our site displays advertisements via Google AdSense. We are not responsible for third-party content or linked websites.</p>
        <h2>4. Limitation of Liability</h2>
        <p>Pet Care Guides shall not be liable for any damages arising from the use of this website.</p>
        <h2>5. Contact</h2>
        <p>Questions? Email contact@petcareguides.com.</p>
      </div>
    </div>
  );
}
