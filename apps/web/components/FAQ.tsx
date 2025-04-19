'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'How do I get started with Uptime Monitor?',
    answer: 'Simply sign up, log in, and start adding the links to the websites you want to monitor.',
  },
  {
    question: 'What happens if my website goes down?',
    answer: 'We will immediately notify you via email or other configured notification methods.',
  },
  {
    question: 'Can I monitor multiple websites?',
    answer: 'Yes, you can add and monitor multiple websites from your dashboard.',
  },
  {
    question: 'How often do you check the status of my websites?',
    answer: 'We perform regular checks at intervals to ensure your websites are up and running.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we use industry-standard encryption and security practices to keep your data safe.',
  },
  {
    question: 'Can I customize the notification settings?',
    answer: 'Yes, you can configure how and when you want to be notified about downtime.',
  },
  {
    question: 'Do you offer a free trial?',
    answer: 'Yes, we offer a free trial so you can explore the features before subscribing.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-20 px-4">
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl font-bold custom-heading mb-2 text-center">Any questions?</h2>
        <p className="text-center text-gray-400 mb-8">
          See the info below or drop me a line via the{' '}
          <span className="font-semibold underline">support</span> page.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#1f1f1f] rounded-2xl transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left focus:outline-none"
              >
                <span className="font-sans">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-white transform transition-transform duration-300 ease-in-out delay-100 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-4 text-gray-400 transition-opacity duration-300 ease-in-out">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
