import constants from "api/constants";
import User from "api/models/User";
import bcrypt from "bcryptjs";
import { generateToken, trim_string, validateRequiredFields, verifyToken } from "helpers/api/utils";
import { nodemailerTransporter } from "libs/nodemailer";

const { errors } = constants;
const { doesNotExist, invalidDetails, alreadyExists } = errors;

/**
 * Creates a new user and stores it in the database.
 *
 * @param {Object} req - NextRequest object.
 * @param {Object} res - NextResponse object.
 * @returns {Promise<void>} A Promise that resolves to a JSON response confirming the successful user creation.
 * @throws {string} Throws an error if any required fields are missing or if the provided email is already in use.
 */
export async function createNewUser(req, res) {
  req.body = trim_string(req.body);
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  // Check if all compulsory fields are not empty
  let compulsoryFields = ["firstName", "lastName", "email", "password", "phoneNumber"];
  validateRequiredFields(compulsoryFields, req.body);

  // check if email already exists
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: `User with email ${alreadyExists.message}`, code: alreadyExists.code });
  }

  // create new user
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ firstName, lastName, email, password: hashedPassword, phoneNumber });

  return res.status(201).json({ message: "User created successfully" });
}

/**
 * Login a user.
 *
 * @param {Object} req - NextRequest object.
 * @param {Object} res - NextResponse object.
 * @returns {Promise<void>} A Promise that resolves to a JSON response confirming the successful user creation.
 * @throws {string} Throws an error if any required fields are missing or if user does not exist.
 */
export async function loginUser(req, res) {
  req.body = trim_string(req.body);
  const { email, password } = req.body;

  // Check if all compulsory fields are not empty
  let compulsoryFields = ["email", "password"];
  validateRequiredFields(compulsoryFields, req.body);

  // check if email exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: `Email ${doesNotExist.message}`, code: doesNotExist.code });
  }

  // check if password matches
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: `Password or email is ${invalidDetails.message}`, code: invalidDetails.code });
  }

  // if email and password match, create JWT
  const token = await generateToken(user, "5d");

  return res.json({ data: { id: user._id, token, name: user.fullName, email: user.email }, message: "success" });
}

export async function forgotUserPassword(req, res) {
  req.body = trim_string(req.body);
  const { email } = req.body;

  validateRequiredFields(["email"], req.body);

  // check if email exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: `email ${doesNotExist.message}`, code: doesNotExist.code });
  }

  // generate a reset token
  const resetToken = await generateToken(user);
  await User.findOneAndUpdate({ email: user.email }, { resetToken });

  // send reset link
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "Password Reset",
    text: `You are receiving this because you (or someone else) requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${process.env.NEXT_PUBLIC_URL}/auth/reset-password?resetToken=${resetToken}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };
  await nodemailerTransporter.sendMail(mailOptions);

  return res.json({ message: "Password reset instructions have been sent to your email" });
}

export async function resetUserPassword(req, res) {
  req.body = trim_string(req.body);
  const { token, password } = req.body;

  // Check if all compulsory fields are not empty
  let compulsoryFields = ["token", "password"];
  validateRequiredFields(compulsoryFields, req.body);

  // verify token
  const isTokenValid = await verifyToken(token);
  const user = await User.findOne({ resetToken: token });

  if (!isTokenValid || !user) {
    return res.status(400).json({ message: `Token is ${invalidDetails.message}`, code: invalidDetails.code });
  }

  // hash the new password
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.resetToken = undefined;
  await User.findOneAndUpdate({ email: user.email }, user);

  return res.json({ message: "Password reset successful" });
}
