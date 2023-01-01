import cryptoRandomString from 'crypto-random-string';
import {BASENAME} from "../config";

export const LINE_DELIM = "<[{";
export const INPUT_DELIM_SUFFIX = "{{[";
export const INPUT_DELIM = `${LINE_DELIM}${INPUT_DELIM_SUFFIX}`;

export function dirtyclone(a) {
	return a.map(i => i);
}
export function genRandomId() {
	return cryptoRandomString({length: 16, type: 'alphanumeric'});
}
export function baseOrigin() {
	return `${window.location.origin}/${BASENAME}`;
}
