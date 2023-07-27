import { User } from "../../../../models/User";
import { NextResponse } from "next/server";
import Database from "../../../../utils/Database";

export const GET = async (req: Request, res: Response) => {
    try {
        await Database();
        const createdUser = await User.create({ username: "firstuser", email: "firstuser@mail.com" });
        if (createdUser) {
            return NextResponse.json({ message: "User created succesfullly", data: createdUser }, { status: 201 });
        } else {
            return NextResponse.json({ message: "Something went wrong.", data: createdUser }, { status: 400 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message });
    }
}