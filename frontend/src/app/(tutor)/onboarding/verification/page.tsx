'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingVerificationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationData, setVerificationData] = useState({
    idType: '',
    idNumber: '',
    idFront: null as File | null,
    idBack: null as File | null,
    certificate: null as File | null,
    experienceDoc: null as File | null,
    agreeToTerms: false
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setVerificationData({
        ...verificationData,
        [name]: files[0]
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationData({
      ...verificationData,
      agreeToTerms: e.target.checked
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsLoading(false);
    router.push('/tutor/onboarding/completed');
  };

  const FileUploadBox = ({
    name,
    label,
    description,
    file
  }: {
    name: string;
    label: string;
    description: string;
    file: File | null;
  }) => (
    <div>
      <label className="block text-sm font-medium text-heading mb-2">{label}</label>
      <div className="border-2 border-dashed border-secondary rounded-lg p-6 text-center hover:border-primary transition-colors">
        <input
          type="file"
          name={name}
          onChange={handleFileChange}
          className="hidden"
          id={name}
          accept="image/*,.pdf"
        />
        <label htmlFor={name} className="cursor-pointer">
          <div className="text-4xl mb-2">📎</div>
          {file ? (
            <div>
              <p className="text-primary font-medium">{file.name}</p>
              <p className="text-muted text-sm">Click to change file</p>
            </div>
          ) : (
            <div>
              <p className="text-body font-medium mb-1">Click to upload</p>
              <p className="text-muted text-sm">{description}</p>
            </div>
          )}
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-app py-16">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted">Step 2 of 3</span>
            <span className="text-sm text-muted">66% complete</span>
          </div>
          <div className="w-full bg-secondary/20 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '66%' }}></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-heading mb-4">Verify your identity</h1>
          <p className="text-body">Help us ensure the quality and credibility of our instructor community</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-sm p-8 space-y-8">
          {/* ID Type */}
          <div>
            <label htmlFor="idType" className="block text-sm font-medium text-heading mb-2">
              Type of Identification *
            </label>
            <select
              id="idType"
              name="idType"
              value={verificationData.idType}
              onChange={(e) => setVerificationData({ ...verificationData, idType: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
              required
            >
              <option value="">Select ID type</option>
              <option value="passport">Passport</option>
              <option value="drivers-license">Driver's License</option>
              <option value="national-id">National ID Card</option>
              <option value="other">Other Government ID</option>
            </select>
          </div>

          {/* ID Number */}
          <div>
            <label htmlFor="idNumber" className="block text-sm font-medium text-heading mb-2">
              ID Number *
            </label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              value={verificationData.idNumber}
              onChange={(e) => setVerificationData({ ...verificationData, idNumber: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-secondary bg-card text-heading transition-colors focus:border-primary"
              placeholder="Enter your ID number"
              required
            />
          </div>

          {/* ID Front */}
          <FileUploadBox
            name="idFront"
            label="ID Front Side *"
            description="Upload a clear photo of the front of your ID"
            file={verificationData.idFront}
          />

          {/* ID Back */}
          <FileUploadBox
            name="idBack"
            label="ID Back Side *"
            description="Upload a clear photo of the back of your ID"
            file={verificationData.idBack}
          />

          {/* Certificate */}
          <FileUploadBox
            name="certificate"
            label="Professional Certificate (Optional)"
            description="Upload relevant certificates or qualifications"
            file={verificationData.certificate}
          />

          {/* Experience Document */}
          <FileUploadBox
            name="experienceDoc"
            label="Experience Verification (Optional)"
            description="Upload resume, portfolio, or work samples"
            file={verificationData.experienceDoc}
          />

          {/* Terms Agreement */}
          <div className="bg-softPurple p-6 rounded-lg">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={verificationData.agreeToTerms}
                onChange={handleCheckboxChange}
                className="mt-1 rounded border-secondary text-primary focus:ring-primary"
                required
              />
              <div>
                <label htmlFor="agreeToTerms" className="text-heading font-medium cursor-pointer">
                  I agree to the instructor terms and conditions *
                </label>
                <p className="text-body text-sm mt-1">
                  By checking this box, you agree to follow our community guidelines, maintain professional conduct,
                  and comply with our content policies. Your information will be kept confidential and used only for
                  verification purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-secondary text-body rounded-lg hover:bg-softPurple transition-colors font-medium"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading || !verificationData.idType || !verificationData.idNumber || !verificationData.agreeToTerms}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Submitting...' : 'Complete Verification'}
            </button>
          </div>
        </form>

        {/* Security Note */}
        <div className="mt-8 bg-card rounded-lg shadow-sm p-6">
          <div className="flex items-start space-x-3">
            <div className="text-info text-xl">🔒</div>
            <div>
              <h3 className="text-heading font-medium mb-1">Your Privacy Matters</h3>
              <p className="text-body text-sm">
                All uploaded documents are encrypted and stored securely. We use bank-level security measures
                and your information is only used for verification purposes. Documents are automatically deleted
                after successful verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
