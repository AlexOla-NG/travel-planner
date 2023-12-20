import mongoose, {Schema, models} from "mongoose";

// STUB: create user schema
const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: [true, "Please add a first name"],
		},
		lastName: { type: String, required: [true, "Please add a last name"] },
		fullName: String,
		email: {
			type: String,
			required: [true, "Please add an email"],
			unique: true,
		},
		phoneNumber: { type: String, required: [true, "Please add a phone number"], },
		password: { type: String, required: [true, "Please add a password"] },
		contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact' }],
		createdAt: { type: Date, default: Date.now },
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// STUB: create fullname field from the first & last name
userSchema.pre("save", function (next) {
	this.fullName = `${this.firstName} ${this.lastName}`;
	next();
});

// STUB: connect schema to users collection
const User = models.User || mongoose.model("User", userSchema);
export default User;