import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * Componente para el inicio de sesión y registro de pacientes.
 * Implementa validaciones frontend y notificaciones tipo toast.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  isLoginView = true;

  email = '';
  password = '';

  regName = '';
  regEmail = '';
  regPassword = '';

  errorMsg = '';
  successMsg = '';
  showToast = signal(false);
  toastType = signal<'success' | 'error'>('success');
  toastMsg = signal('');

  showPassword = signal(false);
  showRegPassword = signal(false);
  showForgotModal = signal(false);
  forgotEmail = '';

  constructor(private authService: AuthService, private router: Router) { }

  toggleView() {
    this.isLoginView = !this.isLoginView;
    this.errorMsg = '';
    this.successMsg = '';
    this.closeToast();
  }

  closeToast() {
    this.showToast.set(false);
  }

  private triggerToast(msg: string, type: 'success' | 'error') {
    this.toastMsg.set(msg);
    this.toastType.set(type);
    this.showToast.set(true);
    // Auto-cerrar después de 4 segundos
    setTimeout(() => this.closeToast(), 4000);
  }

  /**
   * Realiza el inicio de sesión redirigiendo según el rol del usuario (Admin o Paciente).
   */
  async onLogin() {
    this.errorMsg = '';
    try {
      const success = await this.authService.login(this.email, this.password);
      if (success) {
        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/paciente']);
        }
      }
    } catch (error: any) {
      this.triggerToast(error.message, 'error');
    }
  }

  /**
   * Registra un nuevo paciente validando el formato del correo corporativo.
   */
  async onRegister() {
    this.errorMsg = '';
    this.successMsg = '';

    // Validación básica de email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.regEmail)) {
      this.triggerToast('Email inválido, por favor ingrese un correo correcto.', 'error');
      return;
    }

    try {
      const success = await this.authService.register(this.regName, this.regEmail, this.regPassword);
      if (success) {
        this.triggerToast('¡Usuario registrado correctamente! Ya puedes iniciar sesión.', 'success');
        this.isLoginView = true; // Cambiamos a vista de login
      }
    } catch (error: any) {
      this.triggerToast(error.message, 'error');
    }
  }

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  toggleRegPassword() {
    this.showRegPassword.update(v => !v);
  }

  openForgotModal(event: Event) {
    event.preventDefault();
    this.showForgotModal.set(true);
  }

  closeForgotModal() {
    this.showForgotModal.set(false);
  }

  onForgotSubmit() {
    this.triggerToast('Si el correo existe, recibirás instrucciones para restablecer tu contraseña.', 'success');
    this.closeForgotModal();
  }
}
