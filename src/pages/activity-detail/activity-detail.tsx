import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './activity-detail.scss'
import Badge from '../../components/badge'
import BadgeGrid from '../../components/badge-grid'
import status from '../../utils/status'
import withLogin from '../../utils/withLogin'
import request from '../../utils/requests'
import { AtButton } from 'taro-ui';

@withLogin()
export default class BadgeDetail extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      activity: [],
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
    navigationBarTitleText: '活动详情'
  }

  async componentWillMount () {
    console.log(this.$router.params)
    const { badge_id, activity_id } = this.$router.params
    const user_id = this.getUserId();
    if (badge_id && activity_id){
      request.get('getUserBadgesDetail/' + user_id + '/' + badge_id).then(res => {
        if ( res.data && res.data.hasOwnProperty("id") ) {
          const activity = this.loadActivityfromBadge(res.data, activity_id)
          this.setState({
            activity: activity,
            new_activity: -1
          })
        }
        else{
          Taro.showModal ({
            title: '错误',
            content: '获取活动具体信息失败'
          })
        }
      })
    }
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  loadActivityfromBadge(badge,activity_id){
    return badge.userActivityList.find( activity => activity.id.toString() === activity_id.toString() )
  }

  handlePunch(){
    const {activity} = this.state
    const user_id = this.getUserId();
    request.get('attendActivity/' + user_id + '/' + activity.id).then(res => {
      if ( res.data && res.data.hasOwnProperty("id") ) {
        this.setState({
          activity: this.loadActivityfromBadge(res.data, activity.id),
          new_activity: activity.id
        })
      }
      else{
        Taro.showModal ({
          title: '错误',
          content: '打卡失败'
        })
      }
    })
  //   const badge = this.requestPunch(activity_id);
  //   this.setState({
  //     badge: badge,
  //     new_activity: activity_id
  //   })
  }
  // requestPunch(activity_id){
  //   let badge = mockData.badges.find( badge => {
  //     return badge.items.find( item => {
  //       item.finished_time = item.finished_time + 1;
  //       return item.type==='activity' && item.id === activity_id;
  //     })
  //   });
  //   return badge;
  // }

  render () {
    const {activity, new_activity} = this.state
    let punch = false;
    let repeat_items = [];
    if (activity.requiredAttendTimes > 1) {
      activity['prop'] = 'activity';
      activity['value'] = activity.title;
      activity['image'] = activity.icon;
      activity['status'] = activity.attendTimes >= activity.requiredAttendTimes ? status.COMPLETE: status.PROCESSING;
      if (activity["type"] === "scripture" && activity.status != status.COMPLETE) {
        punch = true
      }
      for (var i=1; i<=activity.requiredAttendTimes; i++){
        let each_repeat_item = Object.assign({}, activity);
        each_repeat_item['activity_index'] = i
        each_repeat_item['status'] = activity.attendTimes >= i ? status.COMPLETE: status.PROCESSING;
        repeat_items.push(each_repeat_item)
      }
    }
    return (
      <View className='panel'>
        <View className='avatar-panel'>
          <View>
            <Badge complete={activity.status} size="large" image={activity.icon}></Badge>
            <View className='at-article__h2'>{activity.title}</View>
            <View className='at-article__h3 last_h3'>{activity.description}</View>
            {punch?<AtButton onclick={this.handlePunch.bind(this)}>打卡</AtButton>:""}
          </View>
        </View>
        <BadgeGrid hasBorder={false} data={repeat_items} newActivity={new_activity}/>
      </View>
    )
  }
}

