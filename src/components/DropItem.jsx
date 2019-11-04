import React, { useRef, useEffect } from 'react';
import useDrop from 'hooks/useDrop';

export default ({ children, onDropOver, onDrop, onClickHandler }) => {
  const dropRef = useRef();
  const { dropState } = useDrop({
    ref: dropRef,
    onDropOver,
    onDrop
  });

  useEffect(() => {
    if (dropState === 'drop over') {
      dropRef.current.classList.add('highlight');
    } else {
      dropRef.current.classList.remove('highlight');
    }
  }, [dropState]);

  return (
    <a onClick={onClickHandler} ref={dropRef} href="#none" className="drop_item">
      {children}
    </a>
  );
};
