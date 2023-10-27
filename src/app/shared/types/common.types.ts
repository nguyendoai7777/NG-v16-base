import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type TypedFormGroup<TFormData extends object> = FormGroup<{
  [TFormKey in keyof TFormData]: TFormData[TFormKey] extends Date
    ? FormControl<Date>
    : TFormData[TFormKey] extends (infer TItem)[]
    ? TItem extends Date
      ? FormControl<Date[]>
      : TItem extends object
      ? FormArray<TypedFormGroup<TItem>>
      : FormControl<TItem[]>
    : TFormData[TFormKey] extends object
    ? TypedFormGroup<TFormData[TFormKey]>
    : FormControl<TFormData[TFormKey]>;
}>;

export type ReturnTypeCheck<T = any> = T extends 'Number'
  ? 'Number'
  : T extends 'String'
  ? 'String'
  : T extends 'Boolean'
  ? 'Boolean'
  : T extends 'Object'
  ? 'Object'
  : T extends 'Date'
  ? 'Date'
  : T extends 'Array'
  ? 'Array'
  : T extends 'Symbol'
  ? 'Symbol'
  : T extends 'Null'
  ? 'Null'
  : T extends 'Undefined'
  ? 'Undefined'
  : T extends 'Function'
  ? 'Function'
  : T extends 'BigInt'
  ? 'BigInt'
  : never;

export interface GetLocalStorageConfig {
  parse?: boolean;
  defaultValue?: string;
}
