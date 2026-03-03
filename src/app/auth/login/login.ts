import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
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

  constructor(private authService: AuthService, private router: Router) { }

  toggleView() {
    this.isLoginView = !this.isLoginView;
    this.errorMsg = '';
    this.successMsg = '';
  }

  onLogin() {
    if (this.authService.login(this.email, this.password)) {
      const user = this.authService.currentUser();
      if (user?.tipo === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/paciente']);
      }
    } else {
      this.errorMsg = 'Credenciales inválidas. Intenta de nuevo.';
    }
  }

  onRegister() {
    if (this.authService.register(this.regName, this.regEmail, this.regPassword)) {
      this.successMsg = '¡Registro exitoso! Redirigiendo...';
      setTimeout(() => {
        this.router.navigate(['/paciente']);
      }, 1500);
    } else {
      this.errorMsg = 'Error al registrar. Por favor completa todos los campos.';
    }
  }
}
