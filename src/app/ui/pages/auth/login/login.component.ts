import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { LoginUser, TypedFormGroup } from '@types';
import { AuthService } from '@services/auth.service';
import { LoadingService } from '@services/loading.service';
import { finalize } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatRippleModule,
    FormsModule,
    RouterLink,
    NgIf,
    TranslateModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    class: `auth-layout`,
  },
})
export default class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  #loading = inject(LoadingService);

  hide = signal(false);

  loginForm: TypedFormGroup<LoginUser> = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  toggleShowPassword() {
    this.hide.update((p) => !p);
  }

  fillDefault() {
    this.loginForm.patchValue({
      username: 'root',
      password: 'ar9yT8Z78nWQ',
    });
  }

  logout() {
    this.authService.logout();
  }

  login() {
    if (this.loginForm.valid) {
      this.#loading.startLoading();
      const form = this.loginForm.getRawValue();
      this.authService
        .login(form)
        .pipe(
          finalize(() => {
            this.#loading.stopLoading();
          })
        )
        .subscribe({
          next: (res) => {
            console.log(`cpn res`);
          },
        });
    }
  }
}
//          this.#loading.stopLoadingByEndStream()
