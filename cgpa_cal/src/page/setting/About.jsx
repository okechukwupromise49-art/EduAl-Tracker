import { useContext } from "react";
import { ThemeContext } from "../../App.jsx";

export function About() {
    const {theme} = useContext(ThemeContext)
    const style = " shadow rounded-xl p-6 hover:shadow-md transition-shadow"
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">


      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          About CGPA Tracker
        </h1>
        <p className={`text-xl  max-w-2xl mx-auto 
            ${theme === 'dark' ?' text-white'
             : " text-gray-700"}`}>
          Empowering students with accurate, real-time insights into their academic performance.
        </p>
      </div>

      {/* INTRODUCTION */}
      <section className={` 
          ${theme === 'dark' ?'bg-gray-800 text-white'
           : "bg-white text-gray-700"} shadow-lg rounded-2xl p-8 mb-12`}>
        <p className=" leading-relaxed text-lg">
          CGPA Tracker is a purpose-built platform designed to help university and college students 
          monitor, analyze, and elevate their academic performance. By providing precise GPA and 
          CGPA calculations alongside meaningful progress metrics, the tool enables informed 
          decision-making throughout your academic journey not just at the end of a semester.
        </p>
      </section>

      {/* KEY FEATURES */}
      <section className="mb-12">
        <h2 className= {`text-3xl font-semibold  mb-6 text-center md:text-left ${theme === 'dark' ?' text-white' : " text-gray-800"}`}>
          Core Features
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className={`${style} ${theme === 'dark' ?'bg-gray-800 text-white'
           : "bg-white text-gray-700"}`}>
            <h3 className="text-xl font-bold text-blue-700 mb-2">Precise GPA & CGPA Calculation</h3>
            <p>
              Compute semester GPA and cumulative CGPA instantly with support for your institution’s grading system.
            </p>
          </div>

          <div className={`${style} ${theme === 'dark' ?'bg-gray-800 text-white'
           : "bg-white text-gray-700"}`}>
            <h3 className="text-xl font-bold text-blue-700 mb-2">Academic Goal Tracking</h3>
            <p >
              Visualize your current standing and simulate future performance to reach classification targets (First Class, Upper Second Class, etc.).
            </p>
          </div>

          <div className={`${style} ${theme === 'dark' ?'bg-gray-800 text-white'
           : "bg-white text-gray-700"}`}>
            <h3 className="text-xl font-bold text-blue-700 mb-2">Semester-over-Semester Insights</h3>
            <p >
              Identify patterns, strengths, and areas for improvement across your entire academic record.
            </p>
          </div>

          <div className={`${style} ${theme === 'dark' ?'bg-gray-800 text-white'
           : "bg-white text-gray-700"}`}>
            <h3 className="text-xl font-bold text-blue-700 mb-2">Secure & Private Dashboard</h3>
            <p >
              Your academic data remains confidential, stored securely, and accessible only to you.
            </p>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className={` rounded-2xl p-8 mb-12 ${theme === 'dark' ?'bg-gray-800 text-white'
             : "bg-white text-gray-700"}`}>
        <h2 className="text-3xl font-semibold  mb-4">
          Why Choose CGPA Tracker?
        </h2>
        <p className={` leading-relaxed text-lg ${theme === 'dark' ?' text-gray-400'
             : " text-gray-700"}`}>
          Most students discover critical performance gaps only after results are released. CGPA Tracker 
          delivers continuous visibility, allowing you to make timely adjustments, optimize study strategies, 
          and maintain control over your academic trajectory from day one.
        </p>
      </section>

      {/* MISSION */}
      <section className={`mb-12 ${theme === 'dark' ?' text-gray-200'
             : " text-gray-700"}`}>
        <h2 className="text-3xl font-semibold  mb-4">
          Our Mission
        </h2>
        <p className={` leading-relaxed text-lg ${theme === 'dark' ?' text-gray-400'
             : " text-gray-700"}`}>
          To provide students with intuitive, reliable tools that simplify academic planning, 
          promote proactive performance management, and make sustained excellence more attainable.
        </p>
      </section>

      {/* ABOUT THE DEVELOPER */}
      <section className={` shadow-lg rounded-2xl p-8 mb-12
            ${theme === 'dark' ?'bg-gray-800 text-white'
             : "bg-white text-gray-700"}`}>
        <h2 className="text-3xl font-semibold mb-4">
          About the Developer
        </h2>
        <p className={` leading-relaxed text-lg ${theme === 'dark' ?' text-gray-400'
             : " text-gray-700"}`}>
          CGPA Tracker was created by a software engineer and former student who experienced firsthand 
          the challenges of fragmented result tracking and unclear academic progression. 
          The platform reflects a commitment to building practical, student-focused technology 
          that solves real problems in higher education.
        </p>
      </section>

      {/* FOOTER / METADATA */}
      <div className="text-center text-gray-500 text-sm mt-16">
        <p>Version 1.0 • Released 2026</p>
        <p className="mt-1">Designed and developed with dedication to student success</p>
      </div>

    </div>
  );
}