import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './punch-list.scss'
import TabBar from '../../components/tab-bar'
import status from '../../utils/status'
import { AtList, AtListItem } from "taro-ui"
import withLogin from '../../utils/withLogin'
import request from '../../utils/requests'
import _flattenDeep from 'lodash/flattenDeep'

@withLogin()
export default class PunchList extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      activities: []
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
    navigationBarTitleText: '打卡活动列表'
  }

  aysnc componentWillMount () {
    const userid = this.getUserId();
    request.get('getUserBadgesDetailList/' + userid).then(res => {
      if (res.data instanceof Array){
        // filter the activities, add badge id in each activity 
        const punch_activities = res.data.map( badge => badge.userActivityList.filter( activity => {
          activity['badge_id'] = badge.id
          return activity.type === 'scripture' && activity.status != status.COMPLETE
        }))
        this.setState({
          activities: _flattenDeep(punch_activities)
        })
      }
      else{
        Taro.showModal ({
          title: '错误',
          content: '加载活动信息失败'
        })
      }
    })
    // this.setState({
    //   badges: mockData.badges
    // })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick(data){
    Taro.navigateTo({
      url: '../activity-detail/activity-detail?activity_id='+ data.id + '&badge_id=' + data['badge_id']
    })
  }

  render () {
    const {activities} = this.state
    return (
      <View className='index'>
        <View className='panel'>
          <View className='panel__title'>打卡进行中...</View>
          <View className='panel__content no-padding'>
            <AtList>
            {activities.map((activity) => (
              <AtListItem 
                key={activity.id}
                title={activity.title}
                note={activity.description}
                arrow='right'
                thumb={activity.icon}
                onClick={this.handleClick.bind(this,activity)}
              />
            ))}
            </AtList>
            {activities.length === 0?<View className='at-article__h3'>目前没有需要打卡的活动</View>:""}
          </View>
        </View>
        <TabBar currentPage="punch-list"/>
      </View>
    )
  }
}

