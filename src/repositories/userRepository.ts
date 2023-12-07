import { Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../dataSource";
import { User } from "../entities/user";
import { IUsersRepository } from "../interfaces/IUsersRepository";
import { IUserCreatedDTO } from "../dtos/IUserCreatedDTO";
import { IUserUpdateDTO } from "../dtos/IUserUpdateDTO";
class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async create({
        userDocument,
        creditCardToken,
        value
    }: IUserCreatedDTO): Promise<void> {
        const user = this.repository.create({
            userDocument,
            creditCardToken,
            value
        });
        await this.repository.save(user);
    }

    async find(): Promise<User> {
        return await this.repository.find()
    }

    async findOneBy(id: string): Promise<User> {
        const userId = await this.repository.findOneBy({ id })
        return userId;
    }

    async update(id: string, data: IUserUpdateDTO): Promise<User> {
        const user = await this.repository.update({
            id,
            data: { ...data },
        });

        return user;
    }

    async delete(id: string): Promise<void> {
        const deleteUser = await this.repository.delete({
            id,
        })

    }
}

export { UsersRepository };