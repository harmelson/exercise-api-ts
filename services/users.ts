import { UserProps } from "../interfaces";
import UserModel from "../models/users";

export interface UserResponse {
    code: number,
    data: UserProps[] | UserProps,
}

enum StatusCode {
    OK = 200,
    CREATE = 201,
    NO_RESPONSE = 204,
}

class UserService {

    userModel = new UserModel();

    async getAll(): Promise<UserResponse> {
        const users = await this.userModel.getAll();
        return { code: StatusCode.OK, data: users };
    }

    async getById(id: number) {
        const user = await this.userModel.getById(id);

        if (!user) {
            return { error: { code: 404, message: 'User not found.' } }
        }

        return { code: 200, data: user };
    }
}

export default UserService;