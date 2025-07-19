import bcrypt from 'bcrypt'

const hashPassword = async (password) => {
  // Added a try-catch block for error handling
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Failed to hash password."); // Re-throw or handle the error appropriately
  }
};

export { hashPassword };
