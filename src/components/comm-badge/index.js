import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton, AtInput, AtTextarea } from "taro-ui"
import status from '../../utils/status'
import './index.scss'

export default class CommBadge extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      commNum: 0,
      commPeople: ''
    }
  }

  handleInputChange(name, ...value) {
    this.setState({
      [name]: value[value.length - 2].target.value
    });
  }

  handleClick = () => {
    this.props.onSubmmit(this.state.commNum, this.state.commPeople)
  }
  render () {
    const { data } = this.props;
    return (
      <View class='common-badge-view'>
        <View className='at-article__h3'>需要完成{mock_data.needFinished}</View>
        <View className='at-article__h3'>已经完成{mock_data.hasFinished}</View>
        <View className='at-article__h3'>其中您完成{mock_data.userFinished}</View>
        <AtInput className='input-item'
          title='新增共修'
          type='number'
          value={this.state.commNum}
          onChange={this.handleInputChange.bind(this, 'commNum')}
          placeholder='请输入数字'
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
  data: []
}

