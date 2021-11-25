import { Doc, DocId } from './'

export interface SocialRef extends Doc {
   label?: string,
   slug: string,
   index?: number,
   socialServiceKey: string,
   userId: DocId,
   createdAt: string,
   updatedAt: string
}

export interface SocialRefState {
   _loaded: boolean,
   _data: SocialRef[]
}
