(() => {

  const MESSAGE_TOPIC_GOTO_LOGIN = 'tkGotoLogin';

  const subscribeMessage = (topic, cb) => {
    window.electron.ipcRenderer.on(topic, cb);
  };

  const UIDomManager = (() => {
    let __loginButtonDom;
    return {
      async getLoginButton() {
        if (!__loginButtonDom) {
          const loginButtonId = 'header-login-button';
          __loginButtonDom = document.getElementById(loginButtonId);
        }

        return __loginButtonDom;
      }
    };
  })();

  const AccountManager = (() => {

    return {
      async login(account) {
        console.log(`login account:`, account);
        const loginBtn =await UIDomManager.getLoginButton();
        console.log(`loginBtn:`,loginBtn);
        loginBtn.click();

      }
    };
  })();

  // 订阅:去登录
  subscribeMessage(MESSAGE_TOPIC_GOTO_LOGIN, AccountManager.login);

})();

