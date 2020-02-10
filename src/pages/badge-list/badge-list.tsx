import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './badge-list.scss'
import TabBar from '../../components/tab-bar'
import { AtGrid, AtAvatar, AtList, AtListItem } from "taro-ui"
import request from '../../utils/requests'
import status from '../../utils/status'
// import mockData from '../../utils/mockData';
import withLogin from '../../utils/withLogin'
import Helper from '../../components/helper'

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
    console.log("componentWillMount");
    const userid = this.getUserId();
    console.log("userid in componentWillMount " + userid)
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
  parseDesc(desc){
    return desc.includes("{") ? JSON.parse(desc)[0].text : desc
  }

  render () {
    const {badges} = this.state
    const complete_badges = badges.filter( badge => badge.status === status.COMPLETE).map( badge => { badge['value'] = badge.title; badge['image'] = badge.icon; return badge; })
    const processing_badges = badges.filter( badge => badge.status === status.PROCESSING)
    return (
      <View className='index'>
        <Helper/>
        <View className='panel'>
          <View className='panel__title'>已获得徽章</View>
          <View className='panel__content no-padding'>
          <AtGrid className='circle' hasBorder={false} data={complete_badges} onClick={this.handleClick.bind(this)}/>
          {complete_badges.length === 0?<View className='at-article__h3'>目前没有已经完成的徽章哦～加油啦～～～</View>:""}
          </View>
        </View>
        <View className='panel'>
          <View className='panel__title'>正在进行中</View>
          <View className='panel__content no-padding'>
            <AtList className="circle">
            {processing_badges.map((badge) => (
              <AtListItem 
                key={badge.id}
                title={this.parseDesc(badge.title)}
                note={this.parseDesc(badge.description)}
                arrow='right'
                thumb={badge.icon}
                onClick={this.handleClick.bind(this,badge)}
              />
            ))}
            </AtList>
            {processing_badges.length === 0?<View className='at-article__h3'>目前没有正在进行中的徽章</View>:""}
          </View>
        </View>
        <TabBar currentPage="badge-list"/>
      </View>
    )
  }
}

