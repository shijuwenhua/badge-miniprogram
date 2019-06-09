import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './helper.scss'

export default class Helper extends Component {
  constructor() {
    super(...arguments)
  }
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '帮助'
  }

  componentWillMount () {
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='at-article'>
      <View className='at-article__h1'>
      释聚文化勋章小程序说明
      </View>
      <View className='at-article__content'>
        <View className='at-article__section'>
          <View className='at-article__p'>
          释聚文化是一个平台，通过组织讲解易经课程，禅修等等活动，致力于帮助人们了解中国传统文化，提升内在。
          </View>
          <View className='at-article__p'>
          该小程序目前主要用于用户的徽章打卡，以线下活动扫码，线上查看徽章这种线上线下相结合的方式为主。 用户参与了释聚文化举办的一些活动后，通过扫码解锁活动，再参加完相关的一些活动以后便可以获得对应的徽章。
          </View>
          <View className='at-article__p'>
          以参加佛教四大名山禅修的徽章为例：
该徽章下面有4个活动，分别是朝拜五台山、普陀山、峨眉山、九华山
          </View>
          <View className='at-article__p'>
          老师在禅修活动结束时出示一个活动的二维码，用户通过微信扫该二维码便进入小程序同时点亮了该活动：
          </View>
          <Image 
            className='at-article__img' 
            src='https://www.shijuwenhua.top/pic/mockpic/daka_wutai.png'
            mode='widthFix' />
          <View className='at-article__p'>
          扫码结果：
          </View>
          <Image 
            className='at-article__img' 
            src='https://www.shijuwenhua.top/pic/mockpic/wutai_result.png'
            mode='widthFix' />
          <View className='at-article__p'>
          用户点亮了第一个活动以后，便解锁了该徽章的信息，在“我的徽章”内，可以查询到该徽章进度：
          </View>
          <Image 
            className='at-article__img' 
            src='https://www.shijuwenhua.top/pic/mockpic/wutai_result2.png'
            mode='widthFix' />
          <View className='at-article__p'>
          用户如果后续又参与了其他活动，扫码后也会获得相应徽章：
          </View>
          <Image 
            className='at-article__img' 
            src='https://www.shijuwenhua.top/pic/mockpic/jiuhua_daka.png'
            mode='widthFix' />
          <Image 
            className='at-article__img' 
            src='https://www.shijuwenhua.top/pic/mockpic/emei_daka.png'
            mode='widthFix' />
          <Image 
            className='at-article__img' 
            src='https://www.shijuwenhua.top/pic/mockpic/putuo_daka.png'
            mode='widthFix' />
          <View className='at-article__p'>
          扫码结果：
          </View>
          <Image 
            className='at-article__img' 
            src='https://www.shijuwenhua.top/pic/mockpic/result3.png'
            mode='widthFix' />
          <Image 
            className='at-article__img' 
            src='https://www.shijuwenhua.top/pic/mockpic/result4.png'
            mode='widthFix' />
          <View className='at-article__p'>
          在4个活动都解锁之后，该徽章也自动获得，并且在“我的徽章”>已获得徽章中看到：
          </View>
          <Image 
            className='at-article__img' 
            src='https://www.shijuwenhua.top/pic/mockpic/result5.png'
            mode='widthFix' />
          <Image 
            className='at-article__img' 
            src='https://www.shijuwenhua.top/pic//mockpic/result6.png'
            mode='widthFix' />
          <View className='at-article__p'>
          除了扫码打卡以外，还有一部分活动是需要自己打卡的，以读心经为例：
首先用户扫码开启该打卡徽章：
          </View>
          <Image 
            className='at-article__img' 
            src='https://www.shijuwenhua.top/pic/mockpic/xinjing_daka.png'
            mode='widthFix' />
          <View className='at-article__p'>
          扫码结果：
          </View>
          <Image 
            className='at-article__img' 
            src='https://www.shijuwenhua.top/pic/mockpic/result7.png'
            mode='widthFix' />
          <View className='at-article__p'>
          此时就可以在需要打卡的列表中看到该打卡活动，点击后可以看到打卡页：
          </View>
          <Image 
            className='at-article__img' 
            src='https://www.shijuwenhua.top/pic/mockpic/result8.png'
            mode='widthFix' />
          <Image 
            className='at-article__img' 
            src='https://www.shijuwenhua.top/pic/mockpic/result9.png'
            mode='widthFix' />
          <View className='at-article__p'>
          当需要打卡的次数满足以后，便可以解锁该徽章。
          </View>
          <View className='at-article__p'>
          注：以上二维码为体验版小程序生成的二维码。
          </View>
            
        </View>
      </View>
    </View>
    )
  }
}

