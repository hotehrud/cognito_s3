import s3 from 'js/s3';

const ADD_PHOTOS = 'album/ADD_PHOTOS';
const UPDATE_PROGRESS_NUMBER = 'album/UPDATE_PROGRESS_NUMBER';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const addPhotos = ({ level, items }) => ({
  type: ADD_PHOTOS,
  level,
  items
});

export const updateProgressNumber = n => ({
  type: UPDATE_PROGRESS_NUMBER,
  n
});

export const getPhotos = ({ level }) => async (dispatch, getState) => {
  const { album, auth } = getState();
  const { user } = auth;
  const { photos } = album;

  if (photos[level].length === 0) {
    const items = await s3.bridge(
      'getList',
      {
        path: level === 'public' ? 'album/' : `album/${user.sub}`,
        level
      },
      level !== 'public'
    );
    const promise = items.map(async ({ key }) => {
      const url = await s3.bridge(
        'getObject',
        {
          key,
          level
        },
        level !== 'public'
      );
      return url;
    });
    Promise.all(promise).then(items => {
      dispatch(
        addPhotos({
          level,
          items
        })
      );
    });
  }
};

export const postPhotos = ({ items, level }) => async (dispatch, getState) => {
  const { auth } = getState();
  const { user } = auth;
  const uploadPromise = items.map(async ({ file }) => {
    const res = await s3.bridge(
      'upload',
      {
        path: level === 'private' ? `album/${user.sub}/${file.name}` : `album/${file.name}`,
        level,
        body: file,
        contentType: file.type
      },
      level !== 'public',
      percent => {
        // progress
        dispatch(updateProgressNumber(percent));
      }
    );
    return res;
  });

  Promise.all(uploadPromise).then(datas => {
    const promise = datas.map(async ({ key }) => {
      const url = await s3.bridge(
        'getObject',
        {
          key,
          level
        },
        level !== 'public'
      );
      return url;
    });
    Promise.all(promise).then(items => {
      console.log(items);
      dispatch(
        addPhotos({
          level,
          items
        })
      );
    });
  });
};

/* 초기 상태 선언 */
const initialState = {
  photos: {
    private: [],
    public: []
  },
  progress: {
    n: 0,
    cnt: 0
  }
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function album(state = initialState, action) {
  switch (action.type) {
    case ADD_PHOTOS: {
      const { level, items } = action;
      return {
        ...state,
        photos: {
          ...state.photos,
          [level]: state.photos[level].concat(items)
        }
      };
    }
    case UPDATE_PROGRESS_NUMBER:
      return {
        ...state,
        progress: action.n
      };
    default:
      return state;
  }
}
