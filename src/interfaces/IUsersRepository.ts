import { IUserCreatedDTO } from "../dtos/IUserCreatedDTO";
import { IUserUpdateDTO } from "../dtos/IUserUpdateDTO";
import { User } from "../entities/user";

interface IUsersRepository {
    create(data: IUserCreatedDTO): Promise<void>;
    find():Promise<User>
    findOneBy(id: string): Promise<User>
    update(data: IUserUpdateDTO): Promise<User>
    delete(id: string): Promise<void>
}

export { IUsersRepository}