// app/login/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State สำหรับเก็บข้อความ Error
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // เคลียร์ error เก่าก่อนลองล็อกอินใหม่

    try {
      const result = await signIn("credentials", {
        redirect: false, // สำคัญ: ต้องตั้งเป็น false เพื่อให้ได้ result object กลับมา
        email,
        password,
      });

      if (result?.error) {
        // ถ้ามี error property แสดงว่าล็อกอินไม่สำเร็จ
        console.error("Login Error:", result.error); // ดู error ใน console
        setError(result.error); // เก็บ error message เพื่อแสดงให้ผู้ใช้เห็น
      } else {
        // ล็อกอินสำเร็จ
        router.push("/profile"); // Redirect ไปหน้าหลัก
      }
    } catch (err) {
      // สำหรับ error ที่ไม่คาดคิด (เช่น Network error)
      setError("เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
