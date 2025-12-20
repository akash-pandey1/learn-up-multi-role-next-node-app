'use client';

export default function TermsPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-app">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-heading mb-4">Terms of Service</h1>
          <p className="text-body text-lg">Last updated: January 15, {currentYear}</p>
        </div>

        {/* Content */}
        <div className="bg-card rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">1. Acceptance of Terms</h2>
            <p className="text-body leading-relaxed mb-4">
              By accessing and using Learn-Up ("the Platform"), you accept and agree to be bound by the terms
              and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">2. Use License</h2>
            <p className="text-body leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials on Learn-Up's platform for personal,
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-body space-y-2 ml-4">
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display</li>
              <li>attempt to decompile or reverse engineer any software contained on the platform</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">3. User Accounts</h2>
            <p className="text-body leading-relaxed mb-4">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times.
              You are responsible for safeguarding the password and for all activities that occur under your account.
            </p>
            <p className="text-body leading-relaxed">
              You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware
              of any breach of security or unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">4. Course Content and Intellectual Property</h2>
            <p className="text-body leading-relaxed mb-4">
              The Platform and its original content, features, and functionality are and will remain the exclusive property
              of Learn-Up and its licensors. The Platform is protected by copyright, trademark, and other laws.
            </p>
            <p className="text-body leading-relaxed">
              Course content is licensed to you for personal, non-commercial use only. You may not reproduce, distribute,
              modify, or create derivative works of course materials without explicit permission from Learn-Up.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">5. Payment and Refunds</h2>
            <p className="text-body leading-relaxed mb-4">
              All fees are charged in advance and are non-refundable unless otherwise stated. We offer a 30-day money-back
              guarantee for all courses. Refunds must be requested within 30 days of purchase.
            </p>
            <p className="text-body leading-relaxed">
              Subscription fees are billed in advance on a recurring basis. You may cancel your subscription at any time,
              but fees are non-refundable for the current billing period.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">6. Prohibited Uses</h2>
            <p className="text-body leading-relaxed mb-4">You may not use our Platform:</p>
            <ul className="list-disc list-inside text-body space-y-2 ml-4">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
              <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
              <li>To interfere with or circumvent the security features of the Platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">7. Termination</h2>
            <p className="text-body leading-relaxed mb-4">
              We may terminate or suspend your account and bar access to the Platform immediately, without prior notice or
              liability, under our sole discretion, for any reason whatsoever and without limitation, including but not
              limited to a breach of the Terms.
            </p>
            <p className="text-body leading-relaxed">
              If you wish to terminate your account, you may simply discontinue using the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">8. Limitation of Liability</h2>
            <p className="text-body leading-relaxed">
              In no event shall Learn-Up, nor its directors, employees, partners, agents, suppliers, or affiliates, be
              liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation,
              loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">9. Governing Law</h2>
            <p className="text-body leading-relaxed">
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which Learn-Up operates,
              without regard to its conflict of law provisions. Our failure to enforce any right or provision of these
              Terms will not be considered a waiver of those rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">10. Changes to Terms</h2>
            <p className="text-body leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
              is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes
              a material change will be determined at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-heading mb-4">11. Contact Information</h2>
            <p className="text-body leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-softPurple p-4 rounded-lg mt-4">
              <p className="text-heading font-medium">Email: legal@learn-up.com</p>
              <p className="text-heading font-medium">Address: Learn-Up Legal Department, 123 Education Street, Learning City, LC 12345</p>
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
