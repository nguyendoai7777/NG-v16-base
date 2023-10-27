import { ReturnTypeCheck } from '@types';

export function deepTypeCheck(val: any): ReturnTypeCheck {
  return Object.prototype.toString
    .call(val)
    .replace(/[\[\]]/gi, '')
    .split(' ')[1] as ReturnTypeCheck;
}
