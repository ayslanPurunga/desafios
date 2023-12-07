import bcrypt from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../interfaces/IUsersRepository";
import { IUserCreatedDTO } from "../dtos/IUserCreatedDTO";
import { AppError } from "../errors/AppErrors";
import token from "./token";
import { IUserUpdateDTO } from "../dtos/IUserUpdateDTO";

@injectable()
class UserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }
  async execute(
    {
      userDocument,
      creditCardToken,
      value
    }: IUserCreatedDTO): Promise<void> {

    const userAlreadyExists = await this.usersRepository.findOneBy(id);

    if (userAlreadyExists) {
      throw new AppError("User already exists")
    }

    const userDocumentEncoded = await bcrypt.hash(userDocument, 5);
    const creditCardEncoded = await bcrypt.hash(creditCardToken, 5);

    const userCreated = await this.usersRepository.create({
      userDocument: userDocumentEncoded,
      creditCardToken: creditCardEncoded,
      value
    });

    const tokenCreated = token.encode(userCreated);

    return tokenCreated;

  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOneBy(id);
    return user;
  }

  async getAllUsers() {
    const userList = await this.usersRepository.find()
    return userList;
  }

  async updateUser(id: string, { userDocument, creditCardToken }: IUserUpdateDTO) {
    await this.exists(id)
    const data: any = {}

    if (userDocument) {
      data.userDocument = await bcrypt.hash(userDocument, 5);
    };
    
    if (creditCardToken) {
      data.creditCardToken = await bcrypt.hash(creditCardToken, 5);
    };
    await this.usersRepository.update(data)

    return this.getUserById(id)

  }

  async deleteUser(id: string){
    await this.exists(id)

    await this.usersRepository.delete(id);

    return true;
  }

  async exists(id: string) {
    if (!(await this.usersRepository.findOneBy(id))
    ) {
      throw new AppError(`O usuário ${id} não existe.`)
  }
  }
}

export { UserService }