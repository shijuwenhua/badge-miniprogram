import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'

import './index.scss'

export default class Badge extends Component {
  
  handleClick (e) {
  }
  render () {
    const {
      size,
      complete,
      image
    } = this.props
    return (
      <View className={complete==='1'?'':'badge-grey'} >
        <AtAvatar size={size} circle image={image}></AtAvatar>
      </View>
    )
  }
}
Badge.defaultProps = {
  size: 'normal',
  complete: '1'
}