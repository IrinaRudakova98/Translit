import style from "./style.module.css"
import { FC, useEffect, useRef, useState } from "react";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import Del from "../img/Del.png"


interface Props {
    words: string[];
    onDelete: (index: number) => void;
  }
  
  const Translit: FC<Props> = ({ words, onDelete }) => {
    return (
        <div>
            <ol  className={style.container}>
                <li className={style.containerli}>
                    <div className={style.Grey}>Привет 👋🏻</div>
                    <div className={style.Dark}>Privet</div>
                </li>
                {words.map((word, index) => (
                <Item key={index} word={word} index={index} onDelete={onDelete} />
                ))}
            </ol>
            
            
            
        </div>  
    );
};

const Item: FC<{
    word: string;
    index: number;
    onDelete: (index: number) => void;
}> = ({ word, index, onDelete }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const wordRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkOverflow = () => {
          if (wordRef.current) {
            const isOverflowing =
              wordRef.current.scrollWidth > wordRef.current.clientWidth;
            setShowTooltip(isOverflowing);
          }
        };

        checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
}, [word]);

return (
    <li className={style.containerli}>
      <div className={style.Grey} ref={wordRef}>
        {showTooltip && <div className={style.tollTip}>{word}</div>}
        {word}
      </div>
      <div className={style.Dark}>
        {showTooltip && (
          <div className={style.tollTip}>
            {cyrillicToTranslit().transform(word)}
          </div>
        )}
        <div className={style.DarkText}>
          {cyrillicToTranslit().transform(word)}
        </div>
        <button
          className={style.Btn}
          onClick={() => onDelete(index)}
        >
          <img src={Del} alt="delite" />
        </button>
      </div>
    </li>
  );
};

export default Translit;