import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'

import './index.scss'

export default class TabBar extends Component {
  
  handleClick (e) {
    const { currentPage } = this.props
    if (e == 0 && currentPage != "punch-list"){
      Taro.redirectTo({
        url: '/pages/punch-list/punch-list'
      })
    }
    if (e == 1 && currentPage != "badge-list"){
      Taro.redirectTo({
        url: '/pages/badge-list/badge-list'
      })
    }
  }
  render () {
    const { currentPage } = this.props
    let current = -1
    if (currentPage === "badge-list"){
      current = 1
    }
    if (currentPage === "punch-list"){
      current = 0
    }
    return (
      <AtTabBar
        fixed
        tabList={[
          { title: '打卡', iconType: 'bullet-list'},
          { title: '我的徽章', iconType: 'user' }
        ]}
        onClick={this.handleClick.bind(this)}
        current={current}
      />
    )
  }
}
TabBar.defaultProps = {
  currentPage: 'punch-list'
}