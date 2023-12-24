import script from './tiktok';

export function getTiktokScript(env?: any) {
  let content: string;
  const envStr: string = env
    ? `window._$$_toolkit_env=${JSON.stringify(env)};`
    : '';

  if (process.env.NODE_ENV === 'production') {
    const reg = new RegExp(`export default function startup`);
    content = `
    ${envStr}
    
    ${script.toString().replace(reg, 'function startup')}
    
   startup();
      `;
  } else {
    content = `
    ${envStr}

    ${script.toString()}
    
    ${script.name}();`;
  }

  return content;
}
