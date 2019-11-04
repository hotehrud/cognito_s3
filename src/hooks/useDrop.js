import { useState, useEffect } from 'react';

const useDrop = ({ ref, onDropOver, onDrop }) => {
  const [dropState, updateDropState] = useState('droppable');
  const dropOverCb = e => {
    if (onDropOver) {
      onDropOver(e);
    }
    updateDropState('drop over');
  };

  const dropLeaveCb = () => {
    updateDropState('drop leave');
  };

  const dropCb = e => {
    onDrop(e.dataTransfer);
    updateDropState('dropped');
  };

  const preventDefaults = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    const el = ref.current;
    if (el) {
      ['dragover', 'drop'].forEach(eventName => {
        el.addEventListener(eventName, preventDefaults, false);
      });

      ['dragenter', 'dragover'].forEach(eventName => {
        el.addEventListener(eventName, dropOverCb, false);
      });

      ['dragleave', 'drop'].forEach(eventName => {
        el.addEventListener(eventName, dropLeaveCb, false);
      });

      el.addEventListener('drop', dropCb, false);
      return () => {
        ['dragover', 'drop'].forEach(eventName => {
          el.removeEventListener(eventName, preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
          el.removeEventListener(eventName, dropOverCb, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
          el.removeEventListener(eventName, dropLeaveCb, false);
        });

        el.removeEventListener('drop', dropCb, false);
      };
    }
  });

  return {
    dropState
  };
};

export default useDrop;
