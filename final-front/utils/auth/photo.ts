export function makePhotoEnv() {
  const dbReq = indexedDB.open('db-user', 1);
  dbReq.addEventListener('error', (event: any) => {
    const error = event.target.error;
    console.log('error', error.name);
  });
  dbReq.addEventListener('upgradeneeded', (event: any) => {
    const db = event.target.result;
    const oldVersion = event.oldVersion;
    if (oldVersion < 1) {
      db.createObjectStore('photo', {
        keyPath: 'id',
        autoIncrement: true,
      });
    }
  });
}

export function setGetPhoto(photo: number[], fn: Function): void {
  let photoURL: string | null = null;
  const dbReq = indexedDB.open('db-user', 1);
  dbReq.addEventListener('success', (event: any) => {
    const db = event.target.result;
    let store = db.transaction('photo', 'readwrite').objectStore('photo');
    // ! 없으면 object를 만들어서는 안 된다. 그래야 default-profile.png가 적용될 수 있다.
    if (!photo) {
      fn(photoURL);
      return;
    }
    let addReq = store.add({ photo });
    addReq.addEventListener('success', () => {
      let store = db.transaction('photo', 'readonly').objectStore('photo');
      let getAllReq = store.getAll();
      getAllReq.addEventListener('success', function (event: any) {
        // 가장 위에 있는 것 선택
        // 아이디로 선택하면 안 된다. -> 아이디가 바뀔 수 있으므로
        if (event.target.result[0]) {
          const { photo } = event.target.result[0];
          const data = new Uint8Array(photo);
          const blob = new Blob([data]);
          photoURL = URL.createObjectURL(blob);
        }
        fn(photoURL);
      });
    });
  });
}

export function getPhoto(fn: Function): void {
  let photoURL: string | null = null;
  const dbReq = indexedDB.open('db-user', 1);
  dbReq.addEventListener('success', (event: any) => {
    const db = event.target.result;
    const store = db.transaction('photo', 'readonly').objectStore('photo');
    const getAllReq = store.getAll();
    getAllReq.addEventListener('success', function (event: any) {
      // 가장 위에 있는 것 선택
      // 아이디로 선택하면 안 된다. -> 아이디가 바뀔 수 있으므로
      if (event.target.result[0]) {
        const { photo } = event.target.result[0];
        const data = new Uint8Array(photo);
        const blob = new Blob([data]);
        photoURL = URL.createObjectURL(blob);
      }
      fn(photoURL);
    });
  });
}

export function deletePhoto(fn: Function): void {
  const dbReq = indexedDB.open('db-user', 1);
  dbReq.addEventListener('success', (event: any) => {
    const db = event.target.result;
    const store = db.transaction('photo', 'readwrite').objectStore('photo');
    const delReq = store.clear();
    delReq.addEventListener('success', function (event: any) {
      const photoURL = null;
      fn(photoURL);
    });
  });
}
