import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    console.log("Registration attempt:", email);

    if (!email || !password) {
      console.log("Missing email or password");
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    console.log("Connected to DB");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already registered:", email);
      return NextResponse.json(
        { error: "User already registered" },
        { status: 400 }
      );
    }

    const newUser = await User.create({
      email,
      password,
    });
    console.log("User created:", newUser);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 400 }
    );
  }
}
