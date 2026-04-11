import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App";
import { useContext } from "react";

export function Privacy() {
  const navigate = useNavigate();
  const {theme} = useContext(ThemeContext)

  return (
    <div className={`min-h-screen ${theme === 'dark' ?'bg-gray-900 text-white' : "bg-white text-black"}`}>
      <div className="max-w-3xl mx-auto p-6 md:p-10">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 mb-8 hover:text-blue-500"
        >
          <ArrowLeft size={24} />
          <span>Back</span>
        </button>

        <h1 className={`text-3xl font-bold ${ theme === 'dark' ? 'text-white' : "text-gray-800"} mb-2`}>Privacy Policy</h1>
        <p className="text-gray-500 mb-10">Last updated: March 30, 2026</p>

        <div className={`space-y-8 ${ theme === 'dark' ? 'text-white' : "text-gray-700"} leading-relaxed`}>
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p>
              Welcome to CGPA Tracker. We respect your privacy and are committed to protecting your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and email address when you register</li>
              <li>Academic information (courses, grades, CGPA) you enter</li>
              <li>Profile picture (if you choose to upload one)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide CGPA calculation and tracking features</li>
              <li>Save your academic progress securely</li>
              <li>Improve our app and provide better insights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
            <p>
              Your data is stored securely. We use JWT authentication and do not share your academic records with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Profile Pictures</h2>
            <p>
              Profile pictures are stored using Cloudinary. You can change or remove your picture anytime.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
            <p>
              You can request to delete your account and all your data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please email us at:<br />
              <strong>startech597@gmail.com</strong>
            </p>
          </section>
        </div>

        <div className="mt-12 text-center text-xs text-gray-500">
          © 2026 CGPA Tracker. All rights reserved.
        </div>
      </div>
    </div>
  );
}