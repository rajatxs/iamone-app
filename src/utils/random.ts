import md5 from 'md5'

/** Generate unique element id by specified prefix */
export function generateElementId(prefix: string = 'el'): string {
   const rand = Math.floor(Math.random() * 10e4)
   return prefix.concat('_' + String(rand))
}

export function generateClientId() {
   const userAgent = window.navigator.userAgent
   const rand = Number(Math.random() * 10e5)
   const raw = [userAgent, rand].join(':')

   return md5(raw)
}
