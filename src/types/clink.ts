import { Doc, DocId } from './'

export type CLinkStyle =
   'simple' | 'thumb' |
   'background' | 'card' |
   'grid' | 'slider'

export interface Clink extends Doc {
   thumb?: string
   title: string,
   description?: string,
   href: string,
   style?: CLinkStyle,
   favicon?: string,
   userId: DocId
}

export interface ClinkState {
   _loaded: boolean,
   _data: Clink[]
}
