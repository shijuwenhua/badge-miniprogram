const LIFE_CYCLE_MAP = ['willMount', 'didMount', 'didShow'];
import Taro from '@tarojs/taro'

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

      $_autoLogin() {
        const userid = Taro.getStorageSync("userid")
        if (!userid){
          Taro.login().then(res => {
            if (res.code) {
              console.log(res.code)
            }
          }).catch(error => {
            Taro.showModal ({
              title: '错误',
              content: '未获取到用户信息'
            })
          })
        }
      }
      componentWillMount() {
        if (super.componentWillMount) {
          if (lifecycle === LIFE_CYCLE_MAP[0]) {
            const res = this.$_autoLogin();
          }
          super.componentWillMount();
        }
      }

      componentDidMount() {
        if (super.componentDidMount) {
          if (lifecycle === LIFE_CYCLE_MAP[1]) {
            const res = this.$_autoLogin();
          }

          super.componentDidMount();
        }
      }

      componentDidShow() {
        if (super.componentDidShow) {
          if (lifecycle === LIFE_CYCLE_MAP[2]) {
            const res = this.$_autoLogin();
          }

          super.componentDidShow();
        }
      }
    }
  }
}

export default withLogin;
