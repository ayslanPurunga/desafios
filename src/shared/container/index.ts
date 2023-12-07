import { container } from "tsyringe";
import { IUsersRepository } from "../../interfaces/IUsersRepository";
import { UsersRepository } from "../../repositories/userRepository";


container.registerSingleton<IUsersRepository>(
    "UserRepository",
    UsersRepository
    )
