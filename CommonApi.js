import {hostApi, mainHost} from './links';
import Axios from 'axios';

// export function postWithHeader(link, token, data, onSuccess, onFail) {
//     let formData = new FormData();
//     formData.append('data', JSON.stringify(data));
//     hostApi
//       .post(link, formData, {
//         headers: {accessToken: token, 'content-type': 'multipart/form-data'},
//       })
//       .then(res => res.data)
//       .then(res => {
//         onSuccess(res);
//       })
//       .catch(err => {
//         onFail(err);
//       });
//   }

// export function postWithOutHeader(link, data, onSuccess, onFail) {
//   let formData = new FormData();
//   formData.append('data', JSON.stringify(data));
//   hostApi
//     .post(link, formData, {headers: {'content-type': 'multipart/form-data'}})
//     .then(res => res.data)
//     .then(res => {
//       onSuccess(res);
//     })
//     .catch(err => {
//       onFail(err);
//     });
// }

export function getData(link, params, onSuccess, onFail) {
  Axios.get(mainHost + link, {
    params,
    headers: {'content-type': 'application/json'},
    auth: {username: 'promech', password: '6p{f(SDz>7$E9JJd'},
  })
    .then(res => res)
    .then(res => {
      onSuccess(res);
    })
    .catch(err => {
      onFail(err);
    });
}

export function postData(link, data, onSuccess, onFail) {
  Axios.post(mainHost + link, data, {
    headers: {'content-type': 'application/json'},
    auth: {username: 'promech', password: '6p{f(SDz>7$E9JJd'},
  })
    .then(res => res)
    .then(res => {
      onSuccess(res);
    })
    .catch(err => {
      onFail(err);
    });
}

export function putData(link, data, onSuccess, onFail, api_Key) {
  Axios.put(mainHost + link, data, {
    headers: {'content-type': 'application/json', api_Key},
  })
    .then(res => res.data)
    .then(res => {
      onSuccess(res);
    })
    .catch(err => {
      onFail(err);
    });
}

export function deleteData(link, data, onSuccess, onFail, api_Key) {
  Axios.delete(mainHost + link, {
    data,
    headers: {'content-type': 'application/json', api_Key},
  })
    .then(res => res.data)
    .then(res => {
      onSuccess(res);
    })
    .catch(err => {
      onFail(err);
    });
}

export function deleteWithNoBody(link, onSuccess, onFail, api_Key) {
  Axios.delete(mainHost + link, {
    headers: {'content-type': 'application/json', api_Key},
  })
    .then(res => res.data)
    .then(res => {
      onSuccess(res);
    })
    .catch(err => {
      onFail(err);
    });
}
