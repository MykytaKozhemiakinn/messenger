import { FormControl, FormGroup } from '@angular/forms';

export type TypedFormGroupModel<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>;
}>;
