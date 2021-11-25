import env from './env'

export function socialIconPath(key: string): string {
   return `/icons/${key}.svg`
}

export function loadStyleSheet(url: string) {
   const linkElement = document.createElement('link')
   linkElement.rel = 'stylesheet'
   linkElement.type = 'text/css'
   linkElement.href = url
   document.getElementsByTagName("head")[0].appendChild(linkElement)
}

export function truncate(val: string, len = 28): string {
   return val.substring(0, len)
}

export function toUrl(...args: string[]) {
   return (env.remoteUrl || '').concat(args.join(''))
}

export function toRemoteUrl(...args: string[]) {
   return (env.remoteUrl || '').concat(args.join(''))
}
