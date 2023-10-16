import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { MAX_WORD_LENGTH, MIN_WORD_LENGTH } from "../constants";
import { regexCyrillicUpper, regexLatinUpper } from "../utils/regex";
import { Layout, InputErrorType as ErrorType } from "@lib/types/api";

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  value: string;
};

type ReturnObj = {
  value: string;
  error: ErrorType | null;
  props: Props;
  layout: Layout;
  setError: (payload: ErrorType | null) => void;
};

export const useWordInput = (): ReturnObj => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<ErrorType | null>(null);
  const [layout, setLayout] = useState<Layout>("ru");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().trim();
    let layout: Layout | null = null;
    if (val.length > MAX_WORD_LENGTH) return;
    if (regexCyrillicUpper.test(val)) layout = "ru";
    if (regexLatinUpper.test(val)) layout = "us";
    if (layout === null && !(val === "")) {
      setError("content");
    } else {
      setError(null);
      if (layout) setLayout(layout);
    }

    setValue(val);
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();

    if (val.length < MIN_WORD_LENGTH) {
      setError("minLength");
    }
    return;
  };

  return {
    error,
    value,
    setError,
    layout,
    props: {
      onChange,
      onBlur,
      value,
    },
  };
};

export const getErrorMessage = (err: ErrorType) => {
  switch (err) {
    case "minLength":
      return `Минимальная длина ${MIN_WORD_LENGTH} символа.`;
    case "content":
      return `В слове могут быть символы только одного алфавита.`;
    case "server":
      return `Произошла ошибка на сервере.`;
    default:
      return "Неизвестная ошибка.";
  }
};
