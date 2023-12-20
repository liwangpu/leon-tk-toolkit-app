export default function startup() {
  console.log(`----------------------------------------------------`);
  console.log(`tiktok script work!`);
  console.log(`----------------------------------------------------`);
  const MESSAGE_TOPIC_GOTO_LOGIN = "tkGotoLogin";

  const subscribeMessage = (topic, cb) => {
    window.electron.ipcRenderer.on(topic, data => {
      console.log(`receive message:`, topic, data);
      cb(data);
    });
  };

  const UIDomManager = (() => {
    let __loginButtonDom;
    return {
      async getLoginButton() {
        if (!__loginButtonDom) {
          const loginButtonId = "header-login-button";
          __loginButtonDom = document.getElementById(loginButtonId);
        }

        return __loginButtonDom;
      }
    };
  })();

  const AccountManager = (() => {

    return {
      async login(account) {
        const loginBtn = await UIDomManager.getLoginButton();
        loginBtn.click();
      }
    };
  })();

  // 订阅:去登录
  subscribeMessage(MESSAGE_TOPIC_GOTO_LOGIN, AccountManager.login);
}
