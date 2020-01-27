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
        <View className='at-article__h3'>需要完成<span>{activity.requiredAttendTimes}</span>次</View>
        <View className='at-article__h3'>已经完成<span>{activity.commonTotalAttend}</span>次</View>
        <View className='at-article__h3'>其中您完成<span>{activity.attendTimes}</span>次</View>
        <AtInput className='input-item'
          title='新增共修:'
          type='number'
          value={this.state.commNum}
          onChange={this.handleInputChange.bind(this, 'commNum')}
          placeholder='请输入数字'
          error={errorStatus}
          //onErrorClick={this.handleErrorInfo.bind(this)}
        />
        <AtTextarea className='input-item'
          maxLength={200}
          value={this.state.commPeople}
          onChange={this.handleInputChange.bind(this, 'commPeople')}
          placeholder='请输入回向的人'
        />
        <AtButton className='input-item fix-size-button' type='primary' onClick={this.handleClick.bind(this)}>提交</AtButton>
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

