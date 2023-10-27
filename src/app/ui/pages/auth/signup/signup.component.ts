import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '@services/auth.service';
import { SignUpUser, TypedFormGroup } from '@types';
import { passwordConfirming } from '@helper';

@Component({
  selector: 'signup',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  host: {
    class: `auth-layout`,
  },
})
export default class SignupComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  hide = signal(false);

  signupForm: TypedFormGroup<SignUpUser> = this.fb.nonNullable.group(
    {
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      updateOn: 'submit',
      validators: passwordConfirming('password', 'confirmPassword'),
    }
  );

  toggleShowPassword() {
    this.hide.update((p) => !p);
  }

  signin() {
    if (this.signupForm.valid) {
      const form = this.signupForm.getRawValue();
      this.authService.signup(form);
    }
  }
}
