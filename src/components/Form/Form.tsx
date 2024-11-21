import style from "./style.module.css"
import { useState } from "react";
import Translit from "../Translit/Translit";
import { FC } from "react";
import Del from "../img/Del.png"

interface Props {
  onDeleteAll: () => void;
}

const Close: FC<Props> = ({ onDeleteAll }) => {
  return (
    <div className={style.containerButton}>
      <button className={style.Button} onClick={onDeleteAll}>
       <img  src={Del} alt="delite" /> Очистить всё
      </button>
    </div>
  );
};

function Form() {
  const [inputValue, setInputValue] = useState("");
  const [words, setWords] = useState<string[]>([]);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleDelete = (index: number) => {
    setWords((prevWords) => prevWords.filter((_, i) => i !== index));
  };

  const handleDeleteAll = () => {
    setWords([]);
  };

  const handleButtonClick = () => {
    if (inputValue.trim()) {
      setWords([...words, inputValue]);
      setInputValue("");
      console.log('Нажата кнопка Добавить!');
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleButtonClick();
      console.log('Нажата кнопка Enter!');
    }
  };

  return (
    <>
      <div className={style.container}>
        <input
          type="text"
          placeholder="Начните вводить текст"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className={style.containerBtn} onClick={handleButtonClick}>
          Добавить
        </button>
      </div>
      <Translit words={words} onDelete={handleDelete} />
      <Close onDeleteAll={handleDeleteAll}/>
    </>
  );
}

export default Form;

    