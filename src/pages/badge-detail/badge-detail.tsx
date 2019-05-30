import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './badge-detail.scss'
import Badge from '../../components/badge'
import BadgeGrid from '../../components/badge-grid'
import status from '../../utils/status'
import withLogin from '../../utils/withLogin'
import request from '../../utils/requests'
import { AtButton } from 'taro-ui';
import _flattenDeep from 'lodash/flattenDeep'

@withLogin()
export default class BadgeDetail extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      badge: [],
      new_activity: -1
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

  async componentWillMount () {
    console.log(this.$router.params)
    const { badge_id, activity_id } = this.$router.params
    const user_id = this.getUserId();
    if (badge_id){
      // this.setState({
      //   badge: mockData.badges.find(badge => badge.id.toString() === badge_id.toString()),
      //   new_activity: -1
      // })
      request.get('getUserBadgesDetail/' + user_id + '/' + badge_id).then(res => {
        if ( res.data && res.data.hasOwnProperty("id") ) {
          this.setState({
            badge: res.data,
            new_activity: -1
          })
        }
        else{
          Taro.showModal ({
            title: '错误',
            content: '获取badge具体信息失败'
          })
        }
      })
    }
    if (activity_id){
      this.handlePunch(activity_id)
    }
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick(data){
    const {badge} = this.state
    if data.prop === 'badge'{
      Taro.navigateTo({
        url: '../badge-detail/badge-detail?badge_id='+ data.id
      })
      return
    }
    if data.prop === 'activity'{
      Taro.navigateTo({
        url: '../activity-detail/activity-detail?activity_id='+ data.id + '&badge_id=' + badge.id
      })
      return
    }
  }

  render () {
    const {badge,new_activity} = this.state
    const activity_list = badge["userActivityList"]
    activity_list.map( activity_item => { 
      activity_item['prop'] = 'activity';
      return activity_item;
    })
    const sub_badge_list = badge["badgeList"]
    sub_badge_list.map( sub_badge_list_item => { 
      sub_badge_list_item['prop'] = 'badge';
      return sub_badge_list_item;
    })
    const items = activity_list.concat(sub_badge_list);
    let data = items.map( (badge_item) => { 
      badge_item['value'] = badge_item.title;
      badge_item['image'] = badge_item.icon;
      badge_item['status'] = badge_item.attendTimes >= badge_item.requiredAttendTimes ? status.COMPLETE: status.PROCESSING;
      return badge_item;
    })
    return (
      <View className='panel'>
        <View className='avatar-panel'>
          <View>
            <Badge complete={badge.status} size="large" image={badge.icon}></Badge>
            <View className='at-article__h2'>{badge.title}</View>
            <View className='at-article__h3 last_h3'>{badge.description}</View>
          </View>
        </View>
        <BadgeGrid hasBorder={false} data={data} newActivity={new_activity} onClick={this.handleClick.bind(this)}/>
      </View>
    )
  }
}

