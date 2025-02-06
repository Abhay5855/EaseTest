import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Users, Eye, Award, Share2 } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Brain className="h-6 w-6 text-indigo-600" />,
      title: "Real-time Assessment",
      description: "Monitor candidate progress and problem-solving approach in real-time"
    },
    {
      icon: <Users className="h-6 w-6 text-indigo-600" />,
      title: "Collaborative Environment",
      description: "Host, co-hosts, and attendees can interact in a structured testing environment"
    },
    {
      icon: <Eye className="h-6 w-6 text-indigo-600" />,
      title: "Live Screen Sharing",
      description: "Watch candidates' screens as they solve problems"
    },
    {
      icon: <Award className="h-6 w-6 text-indigo-600" />,
      title: "Instant Evaluation",
      description: "Rate performances and provide feedback in real-time"
    }
  ];

  return (
    <div className="space-y-16">
      <section className="text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-900">
          Transform Your Assessment Process
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A modern platform for real-time skill assessment, enabling organizations to evaluate candidates effectively through interactive testing sessions.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/create"
            className="px-8 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-lg font-semibold"
          >
            Create Test Room
          </Link>
          <Link
            to="/join"
            className="px-8 py-3 rounded-lg border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors text-lg font-semibold"
          >
            Join as Participant
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Why Choose SkillScope?
          </h2>
          <p className="text-gray-600">
            Traditional assessment methods don't capture the problem-solving process. 
            SkillScope provides a comprehensive view of candidates' abilities through 
            real-time monitoring, instant feedback, and detailed analytics.
          </p>
          <div className="flex justify-center items-center gap-4 pt-4">
            <Share2 className="h-5 w-5 text-indigo-600" />
            <span className="text-sm text-gray-500">
              Join thousands of organizations already using SkillScope
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}