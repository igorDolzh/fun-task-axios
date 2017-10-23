import Task from 'fun-task'
import merge from 'ramda/src/merge'
import axios from 'axios'


export let request = (config) =>
  Task.create((onSuccess, onFailure) => {
    let source = axios.CancelToken.source()
    axios.request(merge(config, { cancelToken: source.token }))
      .then(onSuccess, (error) => {
        if (!axios.isCancel(error)) {
          onFailure(response)
        }
      })
    return () => source.cancel()
  })

export let get = (url, config) => request(merge(config, { method: 'get', url }))
export let post = (url, data, config) => request(merge(config, { method: 'post', url, data }))
export let patch = (url, data, config) => request(merge(config, { method: 'patch', url, data }))
export let remove = (url, data, config) => request(merge(config, { method: 'delete', url, data }))

export default {
  request,
  get,
  post,
  patch,
  remove
}
