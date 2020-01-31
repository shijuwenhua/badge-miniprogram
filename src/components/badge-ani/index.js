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
      isOpened: this.props.open,
    }
  }

  componentWillReceiveProps (nextProps) {
    const { isOpened } = this.state
    const newData = nextProps.open;
    if (isOpened !== newData) {
      this.setState({
        isOpened: newData,
      })
    }
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
        <View className='icon-container'>
          <Text>完成{type === 'activity'? '活动': '徽章'}</Text>
          <View className='icon-container image-container'>
          <Image
            className='icon-image'
            src={icon}
            mode='aspectFill'
          />
          </View>
          <Text className= 'at-icon'>{title}</Text>
        </View>
      </AtCurtain>
    )
  }
}