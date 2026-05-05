import { useCallback, useRef } from "react";
import { debounce } from "../general/general";
const DELAY = 250;

const useSingleAndDoubleClick = (onClick: () => void, onDoubleClick: () => void) => {
  const clicks = useRef(0);

  const callFunction = useCallback(
    debounce(() => {
      clicks.current === 3 ? onDoubleClick() : onClick();
      clicks.current = 0;
    }, DELAY),
    []
  );

  const handleClick = () => {
    clicks.current++;
    callFunction();
  };

  const handleDoubleClick = () => {
    clicks.current++;
  };

  return { handleClick, handleDoubleClick };
};

export default useSingleAndDoubleClick;