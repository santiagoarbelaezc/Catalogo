import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

const REMEMBERED_EMAIL_KEY = 'plax_remembered_email';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError = signal<string | null>(null);
  loading = signal(false);
  showPassword = signal(false);

  /** Email guardado de la sesión anterior */
  rememberedEmail = signal<string | null>(null);
  /** Modo recordado: solo muestra el campo de contraseña */
  isRememberedMode = signal(false);

  togglePasswordVisibility() {
    this.showPassword.update(val => !val);
  }

  /** Cambia a otra cuenta (muestra el campo email de nuevo) */
  switchAccount() {
    this.isRememberedMode.set(false);
    this.loginForm.patchValue({ email: '', password: '' });
    this.loginError.set(null);
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    // Verificar si hay un email recordado
    const saved = localStorage.getItem(REMEMBERED_EMAIL_KEY);
    if (saved) {
      this.rememberedEmail.set(saved);
      this.isRememberedMode.set(true);
      this.loginForm.patchValue({ email: saved });
      // En modo recordado el email ya es válido; solo se requiere contraseña
      this.loginForm.get('email')?.clearValidators();
      this.loginForm.get('email')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.loginError.set(null);

      const email = this.isRememberedMode()
        ? this.rememberedEmail()!
        : this.loginForm.value.email;
      const { password } = this.loginForm.value;

      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          this.loading.set(false);
          if (response.success) {
            // Guardar el email para la próxima vez
            localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
            console.log('Login exitoso:', response.data.user);
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          this.loading.set(false);
          this.loginError.set(error.error?.message || 'Error al iniciar sesión');
          console.error('Error en login:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

