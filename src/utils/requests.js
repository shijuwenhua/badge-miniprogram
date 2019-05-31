import Taro from '@tarojs/taro'
export const HTTP_STATUS = {
    SUCCESS: 200,
    CLIENT_ERROR: 400,
    AUTHENTICATE: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504
}
export const logError = (name, action, info) => {
    if (!info) {
      info = 'empty'
    }
    try {
      let deviceInfo = Taro.getSystemInfoSync()
      var device = JSON.stringify(deviceInfo)
    } catch (e) {
      console.error('not support getSystemInfoSync api', err.message)
    }
    let time = new Date().toString()
    console.error(time, name, action, info, device)
    // 如果使用了 第三方日志自动上报
    // if (typeof action !== 'object') {
    // fundebug.notify(name, action, info)
    // }
    // fundebug.notifyError(info, { name, action, device, time })
    if (typeof info === 'object') {
      info = JSON.stringify(info)
    }
}

export default {
  baseOptions(params, method = 'GET') {
    let { url, data } = params
    console.log('params', params)
    Taro.showLoading({
        title: '正在加载'
    })  
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    const option = {
      url: BASE_URL + "/" + url,
      data: data,
      method: method,
      header: { 'content-type': contentType, /*'token': "aa"*/ },
      success(res) {
        Taro.hideLoading()
        if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return res.data
        }
        let msg = ''
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          msg = '请求资源不存在'
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          msg = '服务端出现了问题'
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          msg = '没有权限访问'
        } else if (res.statusCode === HTTP_STATUS.CLIENT_ERROR) {
          msg = '程序出错'
        } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
          msg = '没有认证'
          Taro.navigateTo({url: '/pages/login/login'})
        }
        Taro.showModal ({
          title: '错误',
          content: msg
        })
        logError('api', msg)
      },
      fail(e) {
        Taro.hideLoading()
        Taro.showModal ({
            title: '错误',
            content: '网络请求出错'
        })
        logError('api', '请求接口出现问题', e)
      }
    }
    return Taro.request(option)
  },
  get(url, data = '') {
    let option = { url, data }
    return this.baseOptions(option)
  },
  post: function (url, data, contentType) {
    let params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  }
}
