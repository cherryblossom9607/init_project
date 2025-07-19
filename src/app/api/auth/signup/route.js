import bcrypt from "bcrypt";
import prisma from "@lib/prisma"; // <--- เปลี่ยนมา import จากไฟล์ที่เราสร้าง!

export async function GET() {
  return Response.json({
    message: "Hello !",
  });
}

export async function POST(request) {
  const { name, email, password } = await request.json();

  try {
    const hashPassword = await bcrypt.hashSync(password.toString(), 10); // <--- แนะนำให้ใช้ await bcrypt.hash()

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    return Response.json(
      {
        message: "Create User Complete.",
        data: newUser, // ส่ง object โดยตรงดีกว่า
      },
      { status: 201 }
    ); // เพิ่ม status code
  } catch (error) {
    console.error("Error creating user:", error); // Log error ที่ Server
    let errorMessage = "Failed to create user.";
    let statusCode = 500;

    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      errorMessage = "Email already exists.";
      statusCode = 409;
    }

    return Response.json(
      {
        message: errorMessage,
      },
      { status: statusCode }
    );
  }
}
