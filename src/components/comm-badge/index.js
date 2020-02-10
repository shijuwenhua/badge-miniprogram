import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton, AtInput, AtTextarea } from "taro-ui"
import status from '../../utils/status'
import './index.scss'

export default class CommBadge extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      commNum: '',
      commPeople: '',
      errorStatus: false
    }
  }
  componentWillMount () {
    this.setState({
      commPeople: this.props.data.userActivityList[0].comments
    });
  }

  handleInputChange(name, ...value) {
    const val = value[value.length - 2].target.value;
    this.setState({
      [name]: val
    });
    if (name === 'commNum') {
      if (/^\d+$/.test(val)) {
        this.setState({
          errorStatus: false
        });
      } else {
        this.setState({
          errorStatus: true
        });
      }
    }
  }

  // handleErrorInfo = () => {
  // }

  handleClick = () => {
    const commNum = this.state.commNum.trim();
    if (/^\d+$/.test(commNum)) {
      this.props.onSubmmit(this.state.commNum, this.state.commPeople);
    } else {
      this.setState({
        errorStatus: true
      });
    }
  }

  render () {
    const { data } = this.props;
    const activity = data.userActivityList[0];
    return (
      <View class='common-badge-view'>
        <View className='at-article__h3'>完成目标<span>{activity.requiredAttendTimes}</span>遍</View>
        <View className='at-article__h3'>已经完成<span>{activity.commonTotalAttend}</span>遍</View>
        <View className='at-article__h3'>您个人完成<span>{activity.attendTimes}</span>遍</View>
        <AtInput className='input-item'
          title='新增报数(可以多次重复报):'
          type='number'
          value={this.state.commNum}
          onChange={this.handleInputChange.bind(this, 'commNum')}
          placeholder='请输入数字'
          error={errorStatus}
          //onErrorClick={this.handleErrorInfo.bind(this)}
        />
        <View className='at-article__h3'>回向给(回向名单会长久保存, 可随时修改):</View>
        <AtTextarea className='input-item'
          maxLength={200}
          value={this.state.commPeople}
          onChange={this.handleInputChange.bind(this, 'commPeople')}
          placeholder='在世人：某某，某某\r\n亡人：某某，某某\r\n堕胎婴灵：某某的堕胎婴灵'
        />
        <AtButton className='input-item fix-size-button' type='primary' onClick={this.handleClick.bind(this)}>提交</AtButton>
        <View style='height:1.2rem'></View>
      </View>
    )
  }
}

CommBadge.defaultProps = {
  data: {
    userActivityList: [{
      requiredAttendTimes: 0,
      attendTimes: 0
    }]
  }
}

