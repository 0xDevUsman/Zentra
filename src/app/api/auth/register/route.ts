import { connectDB } from "@/lib/db";
import { RegisterSchema } from "@/types/user";
import { User } from "@/models/user";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  await connectDB();

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const parsedBody = RegisterSchema.safeParse(body);
  if (!parsedBody.success) {
    console.error("Validation error:", parsedBody.error);
    return new Response(
      JSON.stringify({
        message: "Invalid input data",
        errors: parsedBody.error.flatten(),
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { email, password } = parsedBody.data;
  const emailNormalized = email.trim().toLowerCase();

  try {
    const isExistingUser = await User.findOne({ email: emailNormalized });
    if (isExistingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email: emailNormalized,
      password: hashedPassword,
    });
    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return new Response(JSON.stringify({ error: "Registration failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
