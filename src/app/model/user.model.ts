export interface User {
  id?: number; // El signo de interrogación indica que el campo es opcional, ya que no estará presente cuando crees un nuevo usuario
  createdAt?: Date;
  username: string;
  email: string;
  password: string;
}
