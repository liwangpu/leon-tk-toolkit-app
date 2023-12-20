import script from "./tiktok";

export function getTiktokScript() {
  return `${script.toString()};${script.name}();`;
}
