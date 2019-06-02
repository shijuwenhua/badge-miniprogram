import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import status from '../../utils/status'
import classNames from 'classnames'

import './index.scss'

export default class Badge extends Component {
  
  handleClick (e) {
  }
  render () {
    const {
      size,
      complete,
      image,
      circle
    } = this.props
    return (
      <View className={classNames('badge-center', this.props.className,{
        'badge-grey': complete !== status.COMPLETE
      })}>
        <AtAvatar className={classNames({'new-activity': complete === status.COMPLETE})} size={size} circle={circle} image={image}></AtAvatar>
      </View>
    )
  }
}
Badge.defaultProps = {
  size: 'normal',
  complete: '1',
  circle: true,
  light: false
}