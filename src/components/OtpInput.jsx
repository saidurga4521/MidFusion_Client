import React, { useState, useEffect, useRef, useCallback } from "react";

const OtpBox = React.memo(({ id, value, onKeyUp, inputRef }) => {
  return (
    <input
      id={id}
      ref={inputRef}
      value={value}
      className="w-[50px] h-[50px] text-2xl text-center rounded-lg border-2 border-gray-400 focus:outline-none focus:border-red-500"
      onKeyUp={onKeyUp}
      maxLength={1}
    />
  );
});

const OtpInput = ({ size, onSubmit }) => {
  const [inputValues, setInputValues] = useState(() =>
    new Array(size).fill("")
  );
  const inputRefs = useRef([]);

  const focusNext = useCallback((index) => {
    inputRefs.current[index + 1]?.focus();
  }, []);

  const focusPrevious = useCallback((index) => {
    inputRefs.current[index - 1]?.focus();
  }, []);

  const focusNextToNext = useCallback(
    (index) => {
      if (inputRefs.current[index + 2]) {
        inputRefs.current[index + 2].focus();
      } else {
        focusNext(index);
      }
    },
    [focusNext]
  );

  const handleNumericInput = useCallback(
    (event) => {
      const inputValue = Number(event.key);
      if (isNaN(inputValue)) return;

      const inputIndex = Number(event.target.id);

      setInputValues((prev) => {
        const newValues = [...prev];

        if (prev[inputIndex].length === 0) {
          newValues[inputIndex] = inputValue.toString();
          focusNext(inputIndex);
        } else {
          const cursorIndex = event.target.selectionStart;
          if (cursorIndex === 0) {
            if (inputIndex < size - 1) {
              newValues[inputIndex + 1] = prev[inputIndex];
            }
            newValues[inputIndex] = inputValue.toString();
            focusNextToNext(inputIndex);
          } else {
            if (inputIndex < size - 1) {
              newValues[inputIndex + 1] = inputValue.toString();
            }
            focusNextToNext(inputIndex);
          }
        }

        return newValues;
      });
    },
    [focusNext, focusNextToNext, size]
  );

  const handleBackSpace = useCallback(
    (event) => {
      if (event.key !== "Backspace") return;
      const inputIndex = Number(event.target.id);

      setInputValues((prev) => {
        if (prev[inputIndex] === "") return prev;
        const newValues = [...prev];
        newValues[inputIndex] = "";
        return newValues;
      });

      focusPrevious(inputIndex);
    },
    [focusPrevious]
  );

  const onKeyUp = useCallback(
    (event) => {
      handleNumericInput(event);
      handleBackSpace(event);
    },
    [handleNumericInput, handleBackSpace]
  );

  useEffect(() => {
    if (inputValues.includes("")) return;
    onSubmit(inputValues.join(""));
  }, [inputValues, onSubmit]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  return (
    <div className="flex justify-center  gap-2.5 p-5">
      {inputValues.map((val, idx) => (
        <OtpBox
          key={idx}
          id={idx.toString()}
          value={val}
          onKeyUp={onKeyUp}
          inputRef={(el) => (inputRefs.current[idx] = el)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
