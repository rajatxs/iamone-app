
export const NON_WHITE_SPACE_STRING = new RegExp(/^\S*$/g);

export const USERNAME = new RegExp(/^(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/g);

export const EMAIL = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/g);

export const ABSOLUTE_URL = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g);

export const PHONE = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g);
