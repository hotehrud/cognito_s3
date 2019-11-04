import React, { useState, useEffect } from 'react';
import DropItem from 'components/DropItem';

const UPLOAD_LIMIT_MB = 10;

const Upload = ({
  addUploadingData,
  accepts,
  allowedExtesion,
  clickActive = true,
  dropActive = true,
  cName,
  children
}) => {
  const checkRule = files => {
    const len = files.length;
    // check, size
    for (let i = 0; i < len; i += 1) {
      const file = files[i];
      const size = file.size / 1024 / 1024;
      if (size > UPLOAD_LIMIT_MB) {
        window.alert(`업로드 권장 용량 ${UPLOAD_LIMIT_MB}MB 를 초과했습니다`);
        return false;
      }
    }
    return true;
  };

  const onChange = async (e, type) => {
    let input;
    if (type === 'drop') {
      input = e;
    } else {
      input = e.target || e.srcElement;
      if (input.value.length === 0) {
        return;
      }
    }

    const items = [];
    if (input.files && input.files[0]) {
      const { files } = input;

      if (!checkRule(files)) {
        return;
      }

      const len = files.length;
      await (async function loop() {
        for (let i = 0; i < len; i += 1) {
          const file = files[i];
          const filename = file.name;
          if (allowedExtesion) {
            // 지원하는 확장자만 허용.
            const allowed = allowedExtesion.some(item => filename.indexOf(item) > -1);
            if (allowed) {
              items.push({
                id: i,
                file
              });
            }
          } else {
            items.push({
              id: i,
              file
            });
          }
        }
      })();
    }
    addUploadingData(items);
  };

  const onDrop = e => {
    if (!dropActive) return;
    onChange(e, 'drop');
  };

  const onClick = e => {
    if (!clickActive) return;
    e.stopPropagation();
    e.preventDefault();

    const event = document.createEvent('MouseEvents');
    const input = document.getElementById('uploadImageInput');
    event.initMouseEvent('click', false, true, window);
    setTimeout(() => {
      input.value = '';
      input.dispatchEvent(event);
    }, 0);
  };

  return (
    <div className={!cName ? 'upload_box' : `upload_box ${cName}`}>
      <DropItem onClickHandler={onClick} onDrop={onDrop}>
        {children}
        <input onChange={onChange} accept={accepts} type="file" id="uploadImageInput" multiple />
      </DropItem>
    </div>
  );
};

export default Upload;
