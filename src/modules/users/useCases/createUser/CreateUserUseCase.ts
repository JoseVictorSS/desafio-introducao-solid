import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const emailAlreadyUsed = this.usersRepository.findByEmail(email);
    if (emailAlreadyUsed) {
      throw new Error("Email already used!");
    }

    return this.usersRepository.create({ name, email });
  }
}

export { CreateUserUseCase };
