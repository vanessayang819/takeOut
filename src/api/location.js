import {_get} from './index'

export const suggestion = (data) =>{
  let req = {
    data:data
  };
  req.url = 'v1/suggestion'
  return _get(req);
}
// export const location = (data) => {
// 	let req = {
// 		data: data
// 	};
// 	req.url = 'v1/suggestion'
// 	return (req) => axios.get(req.url, { params: req.data })
// }
export const location = (data) =>{
  let req = {
    data
  }
  req.url = 'v1/location'
  return _get(req)
}