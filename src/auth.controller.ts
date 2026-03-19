import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuariosService } from './modules/usuarios/usuarios.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('login')
  async login(
    @Body()
    body: { usuario?: string; contraseña?: string; contrasena?: string },
  ) {
    const usuario = body.usuario;
    const contraseña = body.contraseña ?? body.contrasena;

    if (!usuario || !contraseña) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    const user = await this.usuariosService.login(usuario, contraseña);
    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }
    return user;
  }
}
