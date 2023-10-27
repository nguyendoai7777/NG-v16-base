import { AbstractControl } from '@angular/forms';

export function passwordConfirming(controlName: string, matchingWith: string) {
  return (c: AbstractControl) => {
    let control = c.get(controlName);
    let matchingControl = c.get(matchingWith);
    if (!controlName || !matchingWith || (matchingControl?.errors && !matchingControl.hasError('confirmPasswordValidator'))) {
      return null;
    }
    if (control?.value !== matchingControl?.value) {
      // control?.setErrors({ confirmPasswordValidator: true });
      matchingControl?.setErrors({ confirmPasswordValidator: true });
      return { passwordNotMatch: true };
    } else {
      // control?.setErrors(null);
      matchingControl?.setErrors(null);
      return null;
    }
  };
}
