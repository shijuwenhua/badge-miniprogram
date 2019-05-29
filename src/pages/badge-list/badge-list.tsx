import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './badge-list.scss'
import TabBar from '../../components/tab-bar'
import { AtGrid, AtAvatar, AtList, AtListItem } from "taro-ui"
import request from '../../utils/requests'
import status from '../../utils/status'
// import mockData from '../../utils/mockData';
import withLogin from '../../utils/withLogin'

@withLogin()
export default class BadgeList extends Component {

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
    navigationBarTitleText: '我的徽章'
  }

  aysnc componentWillMount () {
    const userid = this.getUserId();
    request.get('getUserBadgesDetailList/' + userid).then(res => {
      if (res.data instanceof Array){
        this.setState({
          badges: res.data
        })
      }
      else{
        Taro.showModal ({
          title: '错误',
          content: '加载badge信息失败'
        })
      }
    })
    // this.setState({
    //   badges: mockData.badges
    // })
  }

  componentDidMount () {
  }

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
    const complete_badges = badges.filter( badge => badge.status === status.COMPLETE).map( badge => { badge['value'] = badge.title; badge['image'] = badge.icon; return badge; })
    const processing_badges = badges.filter( badge => badge.status === status.PROCESSING)
    return (
      <View className='index'>
        <View className='panel'>
          <View className='panel__title'>已获得徽章</View>
          <View className='panel__content no-padding'>
          <AtGrid className='circle' hasBorder={false} data={complete_badges} onClick={this.handleClick.bind(this)}/>
          </View>
        </View>
        <View className='panel'>
          <View className='panel__title'>正在进行中</View>
          <View className='panel__content no-padding'>
            <AtList className="circle">
            {processing_badges.map((badge) => (
              <AtListItem 
                key={badge.id}
                title={badge.title}
                note={badge.description}
                arrow='right'
                thumb={badge.icon}
                onClick={this.handleClick.bind(this,badge)}
              />
            ))}
            </AtList>
          </View>
        </View>
        <TabBar currentPage="badge-list"/>
      </View>
    )
  }
}

