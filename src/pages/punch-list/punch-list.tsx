import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './punch-list.scss'
import TabBar from '../../components/tab-bar'
import mockData from '../../utils/mockData';
import status from '../../utils/status'
import { AtList, AtListItem } from "taro-ui"
export default class BadgeDetail extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      badges: []
    }
  }
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '徽章详情'
  }

  componentWillMount () { 
    this.setState({
      badges: mockData.badges
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick(data){
    Taro.navigateTo({
      url: '../badge-detail/badge-detail?badge_id='+ data.id
    })
  }

  render () {
    const {badges} = this.state
    const processing_badges = badges.filter( badge => badge.status === status.PROCESSING)
    return (
      <View className='index'>
        <View className='panel'>
          <View className='panel__title'>打卡进行中...</View>
          <View className='panel__content no-padding'>
            <AtList className="circle">
            {processing_badges.map((badge) => (
              <AtListItem 
                key={badge.id}
                title={badge.title}
                note={badge.desc}
                arrow='right'
                thumb={badge.icon}
                onClick={this.handleClick.bind(this,badge)}
              />
            ))}
            </AtList>
          </View>
        </View>
        <TabBar currentPage="punch-list"/>
      </View>
    )
  }
}

