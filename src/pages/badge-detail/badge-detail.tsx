import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './badge-detail.scss'
import Badge from '../../components/badge'
import BadgeGrid from '../../components/badge-grid'
import status from '../../utils/status'
import withLogin from '../../utils/withLogin'
import request from '../../utils/requests'
import TabBar from '../../components/tab-bar'
import CommBadge from '../../components/comm-badge'
import Description from '../../components/description'
import BadgeAni from '../../components/badge-ani'

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
    const { badge_id, scene } = this.$router.params
    //const is_comm_from_scene = 
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
    } else{
      let { activity_id, is_comm } = this.$router.params
      debugger;
      if (scene){    
        let obj = {}, arr = decodeURIComponent(scene).split('&');
        for (let i = 0; i < arr.length; i++) {
            const subArr = arr[i].split('=');
            obj[subArr[0]] = subArr[1];
        }
        activity_id = obj['activity_id'];
        is_comm = obj['is_comm'];
      }
      this.handlePunch(activity_id, is_comm === 'true' ? 0 : 1, '');
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

  handlePunch(activity_id, num, comments, showResult=false){ 
    const user_id = this.getUserId();
    request.get(`attendActivityReutrnBadgeDetail/${user_id}/${activity_id}/${num}?comments=${comments}`).then(res => {
      if ( res.data && res.data.hasOwnProperty("id") ) {
        this.setState({
          badge: res.data,
          new_activity: activity_id
        });
        if(showResult) {
          let content = res.data.title.match(/[万|亿](.*)万人共修/);
          content = (content && content.length == 2) ? content[1] : res.data.title;
          const msg = `您本次完成${num}遍${content}, \r\n您总共完成${res.data.userActivityList[0].attendTimes}遍, \r\n感恩随喜您的功德。`
          Taro.showModal ({
            title: '消息',
            content: msg
          });
          Taro.pageScrollTo({scrollTop:0});
        }; 
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
    const activity_id = this.state.badge["userActivityList"][0].id;
    this.handlePunch(activity_id, commData[0], commData[1], true);
  }


  render () {
    const { badge, new_activity } = this.state
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
      if (activity_list.length == 1 && activity_list[0]['type'] === 'commonScripture') {
        commBadge = true;
        data = badge;
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
    let isOpenShown = false;
    let titleShown = badge.title;
    let iconShown = badge.icon;
    let typeShown = 'badge';
    if (!commBadge && new_activity != -100) {
      isOpenShown = true;
      if (badge.status != status.COMPLETE) {
        typeShown = 'activity';
        const activity = data.filter(i => i['id'].toString() === new_activity.toString());
        if (activity.length != 1) {
          isOpenShown = false;
        }else {
          titleShown = activity[0].title;
          iconShown = activity[0].icon;
        }
      } 
    }
    return (
      <View className='panel nopa'>
        <View className='avatar-panel' id='badge-panel'>
          <View>
            <Badge complete={badge.status} size="large" image={badge.icon}></Badge>
            <View className='at-article__h2'>{badge.title}</View>
            {commBadge ?
              <Image style='width:90%' src={badge.userActivityList[0].icon} mode='aspectFit' lazyLoad></Image>
              :
              ''
            }
            <Description description={badge.description}></Description>
            {badge.status === status.COMPLETE?
              <View className='at-article__h3 congratulation'>恭喜您成功得到勋章！</View>:''
            }
          </View>
        </View>
        {commBadge ?
          <CommBadge data={data} onSubmmit={this.handleCommBadge.bind(this)}></CommBadge>
          :
          <BadgeGrid hasBorder={false} data={data} newActivity={new_activity} onClick={this.handleClick.bind(this)}/>
        }
        <TabBar/>
        <BadgeAni open={isOpenShown} title={titleShown} icon={iconShown} type={typeShown} />
      </View>
    )
  }
}

