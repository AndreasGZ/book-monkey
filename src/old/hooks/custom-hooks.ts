import { useEffect, useState, useCallback } from "react";

export function useDocumentTitle(newTitle: string): void {
  useEffect(() => {
    const defaultTitle = document.title;
    document.title = newTitle;

    return () => {
      document.title = defaultTitle;
    }
  }, [newTitle]);
}

export const useInterval = (intervalFunction: () => void, miliSeconds: number): void => {
  useEffect(() => {
    const intervalId = setInterval(intervalFunction, miliSeconds);
    console.log("intervall");

    return () => {
      clearInterval(intervalId);
      console.log("cleaner");
    }
  }, [intervalFunction, miliSeconds]);
}

export function useCounter(startValue: number): [number, () => void] {
  const [counter, setCounter] = useState(startValue);

  const onIncrementCounter = useCallback(() => {
    setCounter(currentCounter => currentCounter + 1);
  }, []);

  return [counter, onIncrementCounter];
}