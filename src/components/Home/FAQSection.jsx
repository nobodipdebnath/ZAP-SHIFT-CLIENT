import FAQItem from "./FAQItem";

const FAQSection = () => {
  const faqData = [
    {
      question: "How does this posture corrector work?",
      answer:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    },
    {
      question: "Is it suitable for all ages and body types?",
      answer:
        "Yes! It is designed to fit a wide range of ages and body types comfortably.",
    },
    {
      question: "Does it really help with back pain and posture improvement?",
      answer:
        "Absolutely! Consistent use helps reduce back pain and improve posture alignment.",
    },
    {
      question: "Does it have smart features like vibration alerts?",
      answer:
        "Some models come with vibration alerts that notify you when slouching.",
    },
    {
      question: "How will I be notified when the product is back in stock?",
      answer:
        "You will receive an email notification once the product becomes available.",
    },
  ];
  return (
    <div className="max-w-5xl mx-auto lg:px-4 py-10">
      <h2 className="lg:text-[40px] text-4xl font-extrabold text-center text-green-blue">
        Frequently Asked Questions (FAQ)
      </h2>

      <p className="text-base text-black-base text-center mt-4 ">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your body with ease!
      </p>

      <div className="flex flex-col mt-10 gap-4">
        {faqData.map((faq, index) => (
          <FAQItem key={index} faq={faq} />
        ))}
      </div>

      <div className="text-center mt-6">
        <button className="px-8 py-4 rounded-2xl font-semibold md:lg text-base lg:text-xl bg-[#CAEB66] text-green-blue cursor-pointer duration-500 hover:bg-[#a5c640]">
          See More FAQ’s
        </button>
      </div>
    </div>
  );
};

export default FAQSection;
