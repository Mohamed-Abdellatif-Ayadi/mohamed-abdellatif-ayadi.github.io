import React from "react";
import { ProgressBar } from "../components/ui/progress-bar";

const CV: React.FC = () => {
  return (
    <section id="cv" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Curriculum Vitae
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            My professional experience and qualifications
          </p>
        </div>

        <div className="mt-12">
          {/* Summary */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-8">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Professional Summary
              </h3>
              <p className="text-gray-600">
                Experienced software engineer with a passion for creating
                intuitive user interfaces and scalable backend solutions. Skilled
                in modern JavaScript frameworks, responsive design, and cloud
                architecture. Dedicated to writing clean, maintainable code and
                continuously learning new technologies.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  React
                </span>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  JavaScript
                </span>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Node.js
                </span>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  TypeScript
                </span>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  AWS
                </span>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  UI/UX
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Experience Column */}
            <div className="lg:col-span-2">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Experience
                  </h3>

                  {/* Experience Item */}
                  <div className="mb-8 relative">
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-600 rounded-full h-4 w-4 flex-shrink-0"></div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-xl font-semibold text-gray-900">
                          Senior Frontend Developer
                        </h4>
                        <p className="text-gray-600">TechCorp Inc.</p>
                      </div>
                      <div className="text-sm text-gray-500">2021 - Present</div>
                    </div>
                    <div className="ml-8 pl-4 border-l-2 border-gray-200">
                      <ul className="list-disc ml-4 text-gray-600 space-y-2">
                        <li>
                          Led frontend development for the company's flagship
                          product
                        </li>
                        <li>
                          Implemented responsive design patterns using React and
                          Tailwind CSS
                        </li>
                        <li>
                          Improved site performance by 40% through code
                          optimization
                        </li>
                        <li>
                          Mentored junior developers and conducted code reviews
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Experience Item */}
                  <div className="mb-8 relative">
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-600 rounded-full h-4 w-4 flex-shrink-0"></div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-xl font-semibold text-gray-900">
                          Web Developer
                        </h4>
                        <p className="text-gray-600">Digital Solutions Ltd.</p>
                      </div>
                      <div className="text-sm text-gray-500">2018 - 2021</div>
                    </div>
                    <div className="ml-8 pl-4 border-l-2 border-gray-200">
                      <ul className="list-disc ml-4 text-gray-600 space-y-2">
                        <li>
                          Built and maintained client websites using modern
                          JavaScript frameworks
                        </li>
                        <li>
                          Collaborated with designers to implement pixel-perfect
                          interfaces
                        </li>
                        <li>
                          Developed RESTful APIs to support frontend applications
                        </li>
                        <li>
                          Implemented automated testing strategies to ensure code
                          quality
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Experience Item */}
                  <div className="relative">
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-600 rounded-full h-4 w-4 flex-shrink-0"></div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-xl font-semibold text-gray-900">
                          Junior Developer
                        </h4>
                        <p className="text-gray-600">StartUp Studios</p>
                      </div>
                      <div className="text-sm text-gray-500">2016 - 2018</div>
                    </div>
                    <div className="ml-8 pl-4 border-l-2 border-gray-200">
                      <ul className="list-disc ml-4 text-gray-600 space-y-2">
                        <li>
                          Assisted in the development of web applications using
                          HTML, CSS, and JavaScript
                        </li>
                        <li>
                          Performed bug fixes and implemented small features
                        </li>
                        <li>
                          Participated in daily stand-ups and sprint planning
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Education & Skills Column */}
            <div className="lg:col-span-1">
              {/* Education */}
              <div className="bg-white overflow-hidden shadow rounded-lg mb-8">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Education
                  </h3>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      MSc in Computer Science
                    </h4>
                    <p className="text-gray-600">University of Technology</p>
                    <p className="text-sm text-gray-500">2014 - 2016</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      BSc in Software Engineering
                    </h4>
                    <p className="text-gray-600">State University</p>
                    <p className="text-sm text-gray-500">2010 - 2014</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Skills
                  </h3>

                  <div className="space-y-4">
                    <ProgressBar
                      label="Frontend Development"
                      value={90}
                      max={100}
                      level="Advanced"
                    />
                    <ProgressBar
                      label="Backend Development"
                      value={75}
                      max={100}
                      level="Intermediate"
                    />
                    <ProgressBar
                      label="UI/UX Design"
                      value={70}
                      max={100}
                      level="Intermediate"
                    />
                    <ProgressBar
                      label="DevOps"
                      value={50}
                      max={100}
                      level="Basic"
                    />
                    <ProgressBar
                      label="Project Management"
                      value={65}
                      max={100}
                      level="Intermediate"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Download Full CV
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV;
