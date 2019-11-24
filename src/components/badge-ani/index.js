import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import { AtCurtain, AtAvatar } from 'taro-ui'
import status from '../../utils/status'
import classNames from 'classnames'
import './index.scss'

export default class BadgeAni extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      isOpened: false,
    }
  }
  componentWillMount () {
    this.setState({
      isOpened: this.props.open
    })
  }
  onClose () {
    this.setState({
      isOpened: false
    })
  }
  render () {
    const {title, icon, type} = this.props;
    return (
      <AtCurtain
        isOpened={this.state.isOpened}
        onClose={this.onClose.bind(this)}
      >
        <Text>解锁{type === 'activity'? '活动': '徽章'}</Text>
        <View className='content-inner__icon at-avatar at-avatar--middle new-activity'>
          <Image
            className='at-avatar__img'
            src={icon}
            mode='aspectFill'
          />
        <Text className= 'at-icon'>{title}</Text>
        </View>
      </AtCurtain>
    )
  }
}