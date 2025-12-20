'use client';

export default function PrivacyPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-app">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-heading mb-4">Privacy Policy</h1>
          <p className="text-body text-lg">Last updated: January 15, {currentYear}</p>
        </div>

        {/* Content */}
        <div className="bg-card rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">1. Introduction</h2>
            <p className="text-body leading-relaxed mb-4">
              Welcome to Learn-Up ("we," "our," or "us"). We are committed to protecting your privacy and ensuring
              the security of your personal information. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you use our platform and services.
            </p>
            <p className="text-body leading-relaxed">
              Please read this privacy policy carefully. By using Learn-Up, you agree to the collection and use of
              information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-heading mb-3">2.1 Personal Information</h3>
            <p className="text-body leading-relaxed mb-4">
              We may collect personally identifiable information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-body space-y-2 ml-4 mb-4">
              <li>Name and contact information (email address, phone number)</li>
              <li>Account credentials (username, password)</li>
              <li>Profile information (bio, profile picture, preferences)</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Educational background and professional information</li>
              <li>Communications with us (support tickets, feedback)</li>
            </ul>

            <h3 className="text-xl font-semibold text-heading mb-3">2.2 Usage Information</h3>
            <p className="text-body leading-relaxed mb-4">
              We automatically collect certain information about your use of our platform:
            </p>
            <ul className="list-disc list-inside text-body space-y-2 ml-4 mb-4">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, courses accessed)</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Location information (approximate, based on IP address)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">3. How We Use Your Information</h2>
            <p className="text-body leading-relaxed mb-4">We use the collected information for various purposes:</p>
            <ul className="list-disc list-inside text-body space-y-2 ml-4">
              <li>To provide and maintain our platform and services</li>
              <li>To process payments and manage subscriptions</li>
              <li>To personalize your learning experience</li>
              <li>To communicate with you about your account and courses</li>
              <li>To send marketing communications (with your consent)</li>
              <li>To analyze usage patterns and improve our services</li>
              <li>To detect and prevent fraud and abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">4. Information Sharing and Disclosure</h2>
            <p className="text-body leading-relaxed mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your
              consent, except as described in this policy:
            </p>
            <ul className="list-disc list-inside text-body space-y-2 ml-4">
              <li><strong>Service Providers:</strong> We share information with trusted third-party service providers who assist us in operating our platform</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
              <li><strong>With Your Consent:</strong> We may share information with your explicit permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="text-body leading-relaxed mb-4">
              We use cookies and similar technologies to enhance your experience on our platform:
            </p>
            <ul className="list-disc list-inside text-body space-y-2 ml-4">
              <li><strong>Essential Cookies:</strong> Required for platform functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>
            <p className="text-body leading-relaxed mt-4">
              You can control cookie settings through your browser preferences, though disabling cookies may affect platform functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">6. Data Security</h2>
            <p className="text-body leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against
              unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside text-body space-y-2 ml-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication requirements</li>
              <li>Secure data centers and infrastructure</li>
            </ul>
            <p className="text-body leading-relaxed mt-4">
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive
              to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">7. Your Rights and Choices</h2>
            <p className="text-body leading-relaxed mb-4">You have the following rights regarding your personal information:</p>
            <ul className="list-disc list-inside text-body space-y-2 ml-4">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
              <li><strong>Portability:</strong> Request transfer of your data in a structured format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Restriction:</strong> Request limitation of processing in certain circumstances</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">8. Data Retention</h2>
            <p className="text-body leading-relaxed">
              We retain your personal information only as long as necessary for the purposes outlined in this privacy policy,
              unless a longer retention period is required by law. When we no longer need your information, we will securely
              delete or anonymize it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">9. Children's Privacy</h2>
            <p className="text-body leading-relaxed">
              Our platform is not intended for children under 13 years of age. We do not knowingly collect personal
              information from children under 13. If we become aware that we have collected personal information from
              a child under 13, we will take steps to delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">10. International Data Transfers</h2>
            <p className="text-body leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. We ensure that
              such transfers comply with applicable data protection laws and implement appropriate safeguards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">11. Third-Party Links</h2>
            <p className="text-body leading-relaxed">
              Our platform may contain links to third-party websites or services. We are not responsible for the privacy
              practices or content of these third parties. We encourage you to review the privacy policies of any
              third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-body leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any material changes by posting
              the new privacy policy on this page and updating the "Last updated" date. Your continued use of our platform
              after such changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">13. Contact Us</h2>
            <p className="text-body leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-softPurple p-4 rounded-lg">
              <p className="text-heading font-medium">Email: privacy@learn-up.com</p>
              <p className="text-heading font-medium">Data Protection Officer: dpo@learn-up.com</p>
              <p className="text-heading font-medium">Address: Learn-Up Privacy Team, 123 Education Street, Learning City, LC 12345</p>
            </div>
          </section>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
