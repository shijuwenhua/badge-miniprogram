import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './badge-detail.scss'
import Badge from '../../components/badge'
import mockData from '../../utils/mockData'
import _chunk from 'lodash/chunk'
import classNames from 'classnames'
import _isObject from 'lodash/isObject'
import _isFunction from 'lodash/isFunction'

export default class BadgeDetail extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      badge: []
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
    this.setState({
      badge: mockData.badges.find(badge => badge.id.toString() === badge_id.toString())
    })
   }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {badge} = this.state
    const item_size = badge.items.length
    const columnNum = 3;

    const bodyClass = classNames(
      ['at-grid__flex-item', 'at-grid-item', 'at-grid-item--square','at-grid-item--no-border'],
    )

    return (
      <View className='panel'>
        <View className='avatar-panel'>
          <View>
            <Badge complete={badge.status} size="large" image={badge.icon}></Badge>
            <View className='at-article__h2'>{badge.title}</View>
            <View className='at-article__h3'>{badge.desc}</View>
          </View>
        </View>
        <View> 
          {badge.items.map((item,index) => {
            return (
            <View className='at-row'>
              <View className='at-col'key={item.type + item.id}>
                <Badge complete={item.required_time === item.finished_time? 'complete':'processing'} image={item.icon}></Badge>
              </View>
            </View>
            )
          })}
        </View>
        <View className={classNames('at-grid')}>
        {badge.items.map((item, i) => (
          <View className='at-grid__flex' key={i}>
            {item.map((childItem, index) => (
              <View
                key={index}
                className={classNames(bodyClass, {
                  'at-grid-item--last': index === columnNum - 1
                })}
                style={{
                  flex: `0 0 ${100 / columnNum}%`
                }}
              >
                <View className='at-grid-item__content'>
                  <View className='at-grid-item__content-inner'>
                    <View className='content-inner__icon'>
                      {childItem.image && (
                        <Image
                          className='content-inner__img'
                          src={childItem.image}
                          mode='scaleToFill'
                        />
                      )}
                      {_isObject(childItem.iconInfo) && !childItem.image && (
                        <Text
                          className={classNames(
                            childItem.iconInfo.prefixClass || 'at-icon',
                            {
                              [`${childItem.iconInfo.prefixClass ||
                                'at-icon'}-${
                                childItem.iconInfo.value
                              }`]: childItem.iconInfo.value
                            },
                            childItem.iconInfo.className
                          )}
                        />
                      )}
                    </View>
                    <Text className='content-inner__text'>
                      {childItem.value}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
      </View>
    )
  }
}

