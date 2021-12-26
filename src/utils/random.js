
/** Generate unique element id by specified prefix */
export function generateElementId(prefix = 'el') {
   const rand = Math.floor(Math.random() * 10e4)
   return prefix.concat('_' + String(rand))
}
