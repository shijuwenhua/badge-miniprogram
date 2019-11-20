import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import status from '../../utils/status'
import classNames from 'classnames'
import './index.scss'

export default class Description extends Component {

  descToHtml = (description) => {
    
  }

  render () {
    const {description} = this.props
    if (description.includes("{")) {
      const desc = JSON.parse(description.trim());
      return (
        <View className='desc_container'>
          {desc.map((item, i) => (
            <View className='at-article__h3' key={item.text}
              style={{
                'color': item.color || '#999',
                'font-size': `${item.size || '0.8'}rem`,
                'text-align': item.align || 'left',
                'margin-bottom': item.bottom || '0.6rem',
                'margin-top': item.top || '0.2rem'
              }}>
              {item.text}
            </View>
          ))}
        </View>
      )
    }
    return (
      <View className='desc_container at-article__h3 last_h3'>{description}</View>
    )
  }
}
Description.defaultProps = {
  description: ''
}