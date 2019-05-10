import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './badge-list.scss'
import TabBar from '../../components/tab-bar'
import Badge from '../../components/badge'
import { AtGrid, AtAvatar, AtList, AtListItem } from "taro-ui"
import data from '../../utils/mockData'
import mockData from '../../utils/mockData';

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

  componentWillMount () { }

  componentDidMount () { 
    this.setState({
      badges: mockData.badges
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {badges} = this.state
    const complete_badges = badges.filter( badge => badge.status === 'complete').map( badge => { badge['value'] = badge.title; badge['image'] = badge.icon; return badge; })
    return (
      <View className='index'>
        <View className='panel'>
          <View className='panel__title'>已获得徽章</View>
          <View className='panel__content no-padding'></View>
          <AtGrid className='circle' hasBorder={false} data={complete_badges} />
            <View className='at-row'>
              <View className='at-col'>
              <Badge complete='0' image='https://user-images.githubusercontent.com/13499146/44632148-8a054080-a9a8-11e8-85a8-dfafd073dfdf.png'></Badge>
              </View>
              <View className='at-col'>
                <AtAvatar size='large' circle image='https://user-images.githubusercontent.com/13499146/44632148-8a054080-a9a8-11e8-85a8-dfafd073dfdf.png'></AtAvatar>
              </View>
              <View className='at-col'>
                <AtAvatar size='large' circle image='https://jdc.jd.com/img/200'></AtAvatar>
              </View>
            </View>
          </View>
          <View className='panel'>
          <View className='panel__title'>正在进行中</View>
          <View className='panel__content no-padding'></View>
            <AtList>
              <AtListItem
                title='标题文字'
                arrow='right'
                thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
              />
              <AtListItem
                title='标题文字'
                note='描述信息'
                arrow='right'
                thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
              />
              <AtListItem
                title='标题文字'
                note='描述信息'
                extraText='详细信息'
                arrow='right'
                thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
              />
            </AtList>
          </View>
        <TabBar currentPage="badge-list"/>
      </View>
    )
  }
}

