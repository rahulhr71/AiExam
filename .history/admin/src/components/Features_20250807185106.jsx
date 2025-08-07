import React from 'react';
import {
  SparklesIcon,
  ClockIcon,
  AdjustmentsVerticalIcon,
  CpuChipIcon,
  EyeIcon,
  ChartBarIcon,
} from '@heroicons/react/24/solid';

const features = [
  {
    title: 'AI-Based Exam Creation',
    description:
      'Generate question papers automatically using AI based on syllabus, difficulty, and past patterns.',
    icon: <CpuChipIcon className="h-10 w-10 text-white" />,
  },
  {
    title: 'Instant Result Generation',
    description:
      'Evaluate answers in real-time with auto-grading and feedback using NLP techniques.',
    icon: <SparklesIcon className="h-10 w-10 text-white" />,
  },
  {
    title: 'Adaptive Questioning',
    description:
      'AI adapts the difficulty of upcoming questions based on the student’s performance.',
    icon: <AdjustmentsVerticalIcon className="h-10 w-10 text-white" />,
  },
  {
    title: 'Cheating Detection',
    description:
      'Monitor facial expressions, tab-switching, and environment noise to flag suspicious behavior.',
    icon: <EyeIcon className="h-10 w-10 text-white" />,
  },
  {
    title: 'Smart Scheduling',
    description:
      'Automatically schedule exams considering availability of teachers, classrooms, and student load.',
    icon: <ClockIcon className="h-10 w-10 text-white" />,
  },
  {
    title: 'Analytics Dashboard',
    description:
      'Visual insights into student performance, question success rate, and class-level analytics.',
    icon: <ChartBarIcon className="h-10 w-10 text-white" />,
  },
];

const SmartExamFeatures = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#152259]">AI Smart Exam Features</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start hover:shadow-lg transition-shadow"
          >
            <div className="bg-[#152259] p-3 rounded-full mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-[#152259]">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartExamFeatures;
