class Person {
  greeting() {
    console.log("hello");
  }
}

export default function startup() {
  console.log(`----------------------------------------------------`);
  console.log(`小工具脚本已经运行!`);
  console.log(`小工具系统环境变量:`, window._$$_toolkit_env);
  console.log(`----------------------------------------------------`);

  new Person().greeting()
}
