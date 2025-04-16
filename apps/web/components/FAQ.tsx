'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'How long does it take to get started with Feature?',
    answer: 'It usually takes just a few minutes to get started.',
  },
  {
    question: 'Can I make Feature work the way my business operates?',
    answer: 'Yes, it’s highly customizable to fit different business models.',
  },
  {
    question: 'What if I need help?',
    answer: 'Our support team is always ready to help via chat or email.',
  },
  {
    question: 'How do you keep my data safe?',
    answer: 'We use industry-standard encryption and security practices.',
  },
  {
    question: 'Do I need to be tech-savvy to use Feature?',
    answer: 'No, Feature is built for everyone – simple and intuitive.',
  },
  {
    question: 'How often do you improve the product?',
    answer: 'We push updates and improvements weekly.',
  },
  {
    question: 'Can I try before I buy?',
    answer: 'Yes, we offer a free trial so you can explore before buying.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-20 px-4">
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-2 text-center">Any questions?</h2>
        <p className="text-center text-secondary mb-8">
          See the info below or drop me a line via the{' '}
          <span className="font-semibold text-white">support</span> page.
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
                <span className="font-medium text-xl">{faq.question}</span>
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
                <div className="px-5 pb-4 text-secondary transition-opacity duration-300 ease-in-out">
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
