import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'

import './index.scss'

export default class Badge extends Component {
  
  handleClick (e) {
  }
  render () {
    return (
      <View >
        <AtAvatar className="badge_disable" size='normal' circle image='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557336398344&di=f0886470f8fecc97247df1bda0426f11&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fc5668488597d1474422afc94912257f7495e02c816070f-mkOlwu_fw658'></AtAvatar>
      </View>
    )
  }
}
Badge.defaultProps = {
}