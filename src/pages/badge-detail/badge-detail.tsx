import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './badge-detail.scss'
import Badge from '../../components/badge'
import mockData from '../../utils/mockData'

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
    return (
      <View className='panel'>
        <View className='avatar-panel'>
          <View>
            <Badge complete={badge.status} size="large" image={badge.icon}></Badge>
            <View className='at-article__h2'>{badge.title}</View>
            <View className='at-article__h3'>{badge.desc}</View>
          </View>
        </View>
        <View className='at-row'>
          {badge.items.map((item) => (
            <View className='at-col'key={item.type + item.id}>
              <Badge complete={item.required_time === item.finished_time? 'complete':'processing'} image={item.icon}></Badge>
            </View>
          ))}
          <View className='at-col'>
          <Badge complete='0' image='https://user-images.githubusercontent.com/13499146/44632148-8a054080-a9a8-11e8-85a8-dfafd073dfdf.png'></Badge>
          </View>
          <View className='at-col'>
          <Badge complete='0' image='https://user-images.githubusercontent.com/13499146/44632148-8a054080-a9a8-11e8-85a8-dfafd073dfdf.png'></Badge>
          </View>
        </View>
      </View>
    )
  }
}

