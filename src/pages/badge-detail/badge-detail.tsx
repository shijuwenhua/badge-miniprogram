import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './badge-detail.scss'
import Badge from '../../components/badge'
import mockData from '../../utils/mockData'
import BadgeGrid from '../../components/badge-grid'
import status from '../../utils/status'

export default class BadgeDetail extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      badge: []
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
    console.log(this.$router.params)
    const { badge_id, activity_id } = this.$router.params
    this.setState({
      badge: mockData.badges.find(badge => badge.id.toString() === badge_id.toString())
    })
   }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {badge} = this.state
    const items = badge.items;
    const data = items.map( item => { 
      item['value'] = item.title;
      item['image'] = item.icon;
      item['status'] = item.finished_time >= item.requried_time ? status.COMPLETE: status.PROCESSING
      return item;
    })
    return (
      <View className='panel'>
        <View className='avatar-panel'>
          <View>
            <Badge complete={badge.status} size="large" image={badge.icon}></Badge>
            <View className='at-article__h2'>{badge.title}</View>
            <View className='at-article__h3'>{badge.desc}</View>
          </View>
        </View>
        <BadgeGrid hasBorder={false} data={data}/>
      </View>
    )
  }
}

