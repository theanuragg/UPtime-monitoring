'use client';

export default function Testimonials() {
  const reviews = [
    {
      name: "David R.",
      role: "Tech Startup Founder",
      review:
        "We've scaled from 5 to 50 employees using this software. The automation capabilities have eliminated so much busywork, letting us focus on growth. Their regular feature updates show they're committed to improvement.",
    },
    {
      name: "Rebecca H.",
      role: "Freelance Consultant",
      review:
        "The client portal is a game-changer. Only wish the pricing was more flexible for individual users.",
    },
    {
      name: "Carlos M.",
      role: "E-commerce Director",
      review:
        "Good platform with some growing pains. The analytics are excellent, but we've experienced occasional downtime during peak seasons. Their roadmap looks promising though.",
    },
    {
      name: "Akash P.",
      role: "Enterprise IT Manager",
      review:
        "Solid functionality and security features. Integration was more challenging than promised, but once set up, it performs well. Would appreciate more customization options.",
    },
    {
      name: "Thomas W.",
      role: "CEO",
      review:
        "We've identified inefficiencies we never knew existed. Implementation was smooth, and the training resources are comprehensive.",
    },
    {
      name: "Emma T.",
      role: "HR Director",
      review:
        "Finally, software that employees actually want to use! The onboarding workflow automation has reduced our paperwork by 70%. The interface is intuitive enough that even our least tech-savvy team members adapted quickly.",
    },
  ];

  return (
    <div className="min-h-screen bg-black px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white text-4xl font-bold mb-2">Reviews that</h2>
        <h3 className="text-yellow-400 text-4xl font-bold mb-10">make us blush</h3>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-zinc-900 p-5 rounded-lg shadow-md text-white flex flex-col gap-4 max-w-md"
            >
              <div className="text-yellow-400 text-xl">★★★★★</div>
              <p className="text-sm text-zinc-300">{r.review}</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-8 h-8 bg-yellow-400 text-black flex items-center justify-center font-bold rounded-full">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-xs text-zinc-400">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-end">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2">
            Leave a review →
          </button>
        </div>
      </div>
    </div>
  );
}
