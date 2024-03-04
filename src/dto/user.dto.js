export class UserDto {
    constructor(usuario) {
        this.email = usuario.email;
        this.nombre = usuario.nombre;
        this.apellido = usuario.apellido;
    }
}

export class AuthUserDto {
    constructor(usuario) {
      this.email = usuario.email;
      this.password = usuario.password;
    }
  }

  