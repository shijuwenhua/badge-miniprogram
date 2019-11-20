import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './badge-detail.scss'
import Badge from '../../components/badge'
import BadgeGrid from '../../components/badge-grid'
import status from '../../utils/status'
import withLogin from '../../utils/withLogin'
import request from '../../utils/requests'
import TabBar from '../../components/tab-bar'
import CommBadge from '../../components/comm-badge'
import Description from '../../components/description'

@withLogin()
export default class BadgeDetail extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      badge: {status: status.PROCESSING},
      new_activity: -100
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
    const { badge_id, activity_id, scene } = this.$router.params
    const activity_id_from_scene = parseInt(decodeURIComponent(scene).split("=")[1])
    const user_id = this.getUserId();
    if (badge_id){
      // this.setState({
      //   badge: mockData.badges.find(badge => badge.id.toString() === badge_id.toString()),
      //   new_activity: -100
      // })
      request.get(`getUserBadgesDetail/${user_id}/${badge_id}`).then(res => {
        if ( res.data && res.data.hasOwnProperty("id") ) {
          this.setState({
            badge: res.data,
            new_activity: -100
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
    if (activity_id_from_scene){
      this.handlePunch(activity_id_from_scene)
    }
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick(data){
    const {badge} = this.state
    if (data.prop === 'badge') {
      Taro.navigateTo({
        url: '../badge-detail/badge-detail?badge_id='+ data.id
      })
      return
    }
    if (data.prop === 'activity') {
      Taro.navigateTo({
        url: '../activity-detail/activity-detail?activity_id='+ data.id + '&badge_id=' + badge.id
      })
      return
    }
  }

  handlePunch(activity_id){ 
    const user_id = this.getUserId();
    request.get(`attendActivityReutrnBadgeDetail/${user_id}/${activity_id}/1`).then(res => {
      if ( res.data && res.data.hasOwnProperty("id") ) {
        this.setState({
          badge: res.data,
          new_activity: activity_id
        })
      }
      else{
        Taro.showModal ({
          title: '错误',
          content: '打卡失败'
        })
      }
    })
  }

  handleCommBadge(...commData){
    console.log(commData[0] + commData[1]);
  }


  render () {
    const {badge,new_activity} = this.state
    const activity_list = badge["userActivityList"]
    if (activity_list instanceof Array){
      activity_list.map( activity_item => { 
        activity_item['prop'] = 'activity';
        return activity_item;
      })
    }
    const sub_badge_list = badge["badgeList"]
    if (sub_badge_list instanceof Array){
      sub_badge_list.map( sub_badge_list_item => { 
        sub_badge_list_item['prop'] = 'badge';
        return sub_badge_list_item;
      })
    }
    let data = [];
    let commBadge = false;
    if(activity_list instanceof Array) {
      debugger;
      if (activity_list.length == 1 && activity_list[0]['type'] === 'commonScripture') {
        commBadge = true;
      }
      else {
        const items = activity_list.concat(sub_badge_list);
        data = items.map( (badge_item) => { 
          badge_item['value'] = badge_item.title;
          badge_item['image'] = badge_item.icon;
          badge_item['status'] = ((badge_item.attendTimes >= badge_item.requiredAttendTimes) || (badge_item['status'] === status.COMPLETE)) ? status.COMPLETE: status.PROCESSING;
          return badge_item;
        })
      }
    }
    return (
      <View className='panel nopa'>
        <View className='avatar-panel'>
          <View>
            <Badge complete={badge.status} size="large" image={badge.icon}></Badge>
            <View className='at-article__h2'>{badge.title}</View>
            <Description description={badge.description}></Description>
            {badge.status === status.COMPLETE?
              <View className='at-article__h3 congratulation'>恭喜您成功得到勋章！</View>:''
            }
          </View>
        </View>
        {commBadge ?
          <View className='.panel__content'>
            <CommBadge data={data} onSubmmit={this.handleCommBadge.bind(this)}></CommBadge>
           </View>
          :
          <BadgeGrid hasBorder={false} data={data} newActivity={new_activity} onClick={this.handleClick.bind(this)}/>
        }
        <TabBar/>
      </View>
    )
  }
}

