import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserService } from "../services/userService";

class UserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            userDocument,
            creditCardToken,
            value,
        } = request.body;

        const userService = container.resolve(UserService)

        const user = await userService.execute({
            userDocument,
            creditCardToken,
            value,
        });

        return response.status(201).json(user)
    }

    async list(request: Request, response: Response): Promise<Response> {
        const userService = container.resolve(UserService);
        const users = await userService.getAllUsers();
        return response.status(200).json(users);
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const userService = container.resolve(UserService);
        const user = await userService.getUserById(String(id));
        if (!user) {
            return response.status(404).json({ message: 'Usuário não encontrado' });
        }
        return response.status(200).json(user);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { userDocument, creditCardToken } = request.body;
        const userService = container.resolve(UserService);
        const updatedUser = await userService.updateUser(userDocument, creditCardToken);
        if (!updatedUser) {
            return response.status(404).json({ message: 'Usuário não encontrado' });
        }
        return response.status(200).json(updatedUser);
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const userService = container.resolve(UserService);
        const deletionResult = await userService.deleteUser(String(id));
        if (!deletionResult) {
            return response.status(404).json({ message: 'Usuário não encontrado' });
        }
        return response.status(200).json({ message: 'Usuário removido com sucesso' });
    }




}

export { UserController }