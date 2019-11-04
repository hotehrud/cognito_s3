import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Upload from 'components/Upload';
import Loading from 'components/Loading';
import { getPhotos, postPhotos } from '../modules/album';

import 'styles/mypage.scss';

const PrivateAlbum = () => {
  const [uploadingData, setUploadingData] = useState();
  const [loadingState, setLoadingState] = useState(false);
  const photos = useSelector(state => state.album.photos);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      setLoadingState(true);
      await dispatch(
        getPhotos({
          level: 'private'
        })
      );
      setLoadingState(false);
    };
    fetch();
  }, []);

  const upload = () => {
    if (uploadingData && uploadingData.length > 0) {
      dispatch(
        postPhotos({
          items: uploadingData,
          level: 'private'
        })
      );
    }
  };

  return (
    <>
      <div className="card">
        <h1>Private Album</h1>
        {loadingState && <Loading cName="page_loading" />}

        <ul className="photo_list">
          {photos.private.map((photo, index) => (
            <li key={index}>
              <img src={photo} alt="private_photo" />
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h1>Upload</h1>
        <div className="upload_area">
          <Upload addUploadingData={setUploadingData}>
            <div>
              <strong>Choose a folder&nbsp;</strong>
              <span>or drag it here</span>
            </div>
          </Upload>
          <button onClick={upload} type="button" className="btn_comm">
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default PrivateAlbum;
