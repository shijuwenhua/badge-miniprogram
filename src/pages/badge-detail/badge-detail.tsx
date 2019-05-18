import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './badge-detail.scss'
import Badge from '../../components/badge'
import mockData from '../../utils/mockData'
import BadgeGrid from '../../components/badge-grid'
import status from '../../utils/status'
import withLogin from '../../utils/withLogin'
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

  componentWillMount () {
    console.log(this.$router.params)
    const { badge_id, activity_id } = this.$router.params
    if (badge_id){
      this.setState({
        badge: mockData.badges.find(badge => badge.id.toString() === badge_id.toString()),
        new_activity: -1
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
    if data.type === 'badge'{
      Taro.navigateTo({
        url: '../badge-detail/badge-detail?badge_id='+ data.id
      })
    }
  }

  handlePunch(activity_id){
    const userid = this.getUserId();
    const badge = this.requestPunch(activity_id);
    this.setState({
      badge: badge,
      new_activity: activity_id
    })
  }
  requestPunch(activity_id){
    let badge = mockData.badges.find( badge => {
      return badge.items.find( item => {
        item.finished_time = item.finished_time + 1;
        return item.type==='activity' && item.id === activity_id;
      })
    });
    return badge;
  }

  render () {
    const {badge,new_activity} = this.state
    const items = badge.items;
    let punch = false;
    let repeat_items = [];
    let data = items.map( (badge_item, index) => { 
      badge_item['value'] = badge_item.title;
      badge_item['image'] = badge_item.icon;
      if (badge_item.required_time > 1) {
        repeat_items.push(index)
      } 
      badge_item['status'] = badge_item.finished_time >= badge_item.required_time ? status.COMPLETE: status.PROCESSING;
      if (badge_item["need_punch"] === "true") punch = badge_item.id
      return badge_item;
    })
    repeat_items.forEach (repeat_index => {
      const repeat_item = data[repeat_index];
      const repeat_times = repeat_item.required_time;
      let replace_items = [];
      for (var i=1; i<=repeat_times; i++){
        let each_repeat_item = Object.assign({}, repeat_item);
        each_repeat_item['activity_index'] = i
        each_repeat_item['status'] = repeat_item.finished_time >= i ? status.COMPLETE: status.PROCESSING;
        replace_items.push(each_repeat_item)
      }
      data.splice(repeat_index,1,replace_items);
    })
    data = _flattenDeep(data);
    return (
      <View className='panel'>
        <View className='avatar-panel'>
          <View>
            <Badge complete={badge.status} size="large" image={badge.icon}></Badge>
            <View className='at-article__h2'>{badge.title}</View>
            <View className='at-article__h3 last_h3'>{badge.desc}</View>
            {punch?<AtButton onclick={this.handlePunch.bind(this,punch)}>打卡</AtButton>:""}
          </View>
        </View>
        <BadgeGrid hasBorder={false} data={data} newActivity={new_activity} onClick={this.handleClick.bind(this)}/>
      </View>
    )
  }
}

