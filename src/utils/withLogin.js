const LIFE_CYCLE_MAP = ['willMount', 'didMount', 'didShow'];
import Taro from '@tarojs/taro'
import request from '../utils/requests'

/**
 *
 * 登录鉴权
 *
 * @param {string} [lifecycle] 需要等待的鉴权完再执行的生命周期 willMount didMount didShow
 * @returns 包装后的Component
 *
 */
function withLogin(lifecycle = 'willMount') {
  // 异常规避提醒
  if (LIFE_CYCLE_MAP.indexOf(lifecycle) < 0) {
    console.warn(
      `传入的生命周期不存在, 鉴权判断异常 ===========> $_{lifecycle}`
    );
    return Component => Component;
  }

  return function withLoginComponent(Component) {
    // 避免H5兼容异常
    if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
      return Component;
    }

    // 这里还可以通过redux来获取本地用户信息，在用户一次登录之后，其他需要鉴权的页面可以用判断跳过流程
    // @connect(({ user }) => ({
    //   userInfo: user.userInfo,
    // }))
    return class WithLogin extends Component {
      constructor(props) {
        super(props);
      }

      async $_autoLogin() {
        const userid = Taro.getStorageSync("userid")
        if (!userid){
          try{
            const res = await Taro.login()
            if (res.code) {
              console.log(res.code)
              const res2 = await request.get('getOpenId?code=' + res.code)
              if (res2 && res2.data){
                Taro.setStorageSync("userid", res2.data)
              }
              else{
                Taro.showModal ({
                  title: '错误',
                  content: '未获取到用户信息'
                })
              }
            }
          }catch(error) {
            Taro.showModal ({
              title: '错误',
              content: '未获取到用户信息'
            })
          }
        }
      }

      getUserId(){
        return Taro.getStorageSync("userid")
      }

      async componentWillMount() {
        if (super.componentWillMount) {
          if (lifecycle === LIFE_CYCLE_MAP[0]) {
            const res = await this.$_autoLogin();
            super.componentWillMount();
          }    
        }
      }

      // async componentDidMount() {
      //   if (super.componentDidMount) {
      //     if (lifecycle === LIFE_CYCLE_MAP[1]) {
      //       const res = await this.$_autoLogin();
      //       console.log('componentDidMount with login')
      //       super.componentDidMount();
      //     }

      //     //super.componentDidMount();
      //   }
      // }

      // async componentDidShow() {
      //   if (super.componentDidShow) {
      //     if (lifecycle === LIFE_CYCLE_MAP[2]) {
      //       const res = await this.$_autoLogin();
      //       console.log('componentDidShow with login')
      //       super.componentDidShow();
      //     }
      //   }
      // }
    }
  }
}

export default withLogin;
