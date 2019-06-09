import Taro, { Component } from '@tarojs/taro'
import { AtIcon } from 'taro-ui'
import './index.scss'

export default class Helper extends Component {

  componentWillMount () {
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick(){
    Taro.navigateTo({
      url: '/pages/helper/helper'
    })
  }
  render () {
    return (
      <AtIcon customStyle='position: fixed; right: 50rpx; z-index: 700;' value='help' size='15' color='#cccccc' onClick={this.handleClick}></AtIcon>
    )
  }
}

