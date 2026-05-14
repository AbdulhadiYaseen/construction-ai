import { prisma } from "c:/Users/Usama/Desktop/AgenticAi/construction-ai/src/lib/prisma"
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { name, email, password } = body;

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                {
                    message: "Please provide name, email and password",
                },
                {
                    status: 400,
                }
            );
        }

        // Check existing user
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    message: "User already exists",
                },
                {
                    status: 400,
                }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // Generate JWT
        const token = jwt.sign(
            {
                userId: user.id,
            },
            JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // Set cookie
        (await cookies()).set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        return NextResponse.json(
            {
                message: "User created successfully",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                message: "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
}