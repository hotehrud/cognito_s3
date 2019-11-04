import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Upload from 'components/Upload';
import Loading from 'components/Loading';
import { getPhotos, postPhotos } from '../modules/album';

import 'styles/mypage.scss';

const PublicAlbum = () => {
  const [uploadingData, setUploadingData] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const photos = useSelector(state => state.album.photos);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      await dispatch(
        getPhotos({
          level: 'public'
        })
      );
      setLoadingState(false);
    };
    fetch();
  }, []);

  const upload = async () => {
    if (uploadingData && uploadingData.length > 0) {
      setLoadingState(true);
      await dispatch(
        postPhotos({
          items: uploadingData,
          level: 'public'
        })
      );
      setUploadingData([]);
      setLoadingState(false);
    }
  };

  return (
    <>
      <div className="card">
        <h1>Public Photos</h1>
        {loadingState && <Loading cName="page_loading" />}
        <ul className="photo_list">
          {photos.public.map((photo, index) => (
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
        <ul>
          {uploadingData.map(item => (
            <li key={item.id}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PublicAlbum;
