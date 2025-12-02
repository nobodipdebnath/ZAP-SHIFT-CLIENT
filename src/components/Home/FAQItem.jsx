import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FAQItem = ({faq}) => {
    const {question, answer } = faq;
  const [open, setOpen] = useState(false);

  return (
    <div className={open ? "p-6 rounded-2xl bg-[#E6F2F3] border-[#2B8282] border " : " bg-white p-6 rounded-2xl"}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left text-base font-bold text-green-blue">{question}
        {open ? (
          <FiChevronUp className="text-2xl cursor-pointer text-gray-800" />
        ) : (
          <FiChevronDown className="text-2xl cursor-pointer text-gray-800" />
        )}
      </button>

      {open && (
        <>
            <hr className="my-4 text-[#2B8282]" />
            <p className="text-base text-black-base">{answer}</p>
        </>
        
      )}
    </div>
  );
};

export default FAQItem;
