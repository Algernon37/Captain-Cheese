import { useState, useCallback, useEffect } from 'react';
import style from './style/modalwindow.module.sass';
import { useTranslation } from "react-i18next";

const ModalWindow = ({ show, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslation();

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            document.addEventListener('keydown', handleKeyDown);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 800);
            document.removeEventListener('keydown', handleKeyDown);
            return () => clearTimeout(timer);
        }
    }, [show, handleKeyDown]);

    useEffect(() => {
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    },[handleKeyDown])

    return (
        <div 
            className={`${style.modalBackdrop} 
            ${show ? style.show : ''}`} 
            style={{display: isVisible }}
            onClick={onClose}
        >
            <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className={style.modelCloseButton} aria-label="Close modal"></button>
                <h2 className='text-[#4824ff] text-4xl mb-4'>{t("modalContact.contactTitle")}</h2>
                <p className='text-2xl'>{t("modalContact.contactText")}</p>
                <div className='flex gap-4 mt-4'>
                    <a href="https://t.me/capcheese" target="_blank" className={style.socialButton}>
                        <div className={`${style.social} ${style.telegram}`}></div><p>Telegram</p>
                    </a>
                    <a href="https://www.instagram.com/cap.cheeses/" target="_blank" className={style.socialButton}>
                        <div className={`${style.social} ${style.instagram}`}></div><p>Instagram</p>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ModalWindow

