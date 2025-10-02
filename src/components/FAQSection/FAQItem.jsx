import { useAutoAnimate } from '@formkit/auto-animate/react';
import style from './style/FAQsection.module.sass'

export default function FAQItem({ question, answer, isOpen, onClick }) {
  const [parent] = useAutoAnimate(); 

  return (
      <li
        onClick={onClick}
        className={`cursor-pointer border-b border-gray-300 p-4 ${style.FAQitem}`}
        ref={parent}
      >
        <div className="flex items-center justify-between hover:text-[#4824ff] transition-colors">
          <p className="text-[26px]">{question}</p>
          <span
            className={`transition-transform ${
              isOpen ? 'rotate-45' : 'text-gray-500'
            }`}
          >
            <p className={style.crossIcon} />
          </span>
        </div>

        {isOpen && (
          <div className={style.answer}>
            <p>{answer}</p>
          </div>
        )}
      </li>
  );
}
