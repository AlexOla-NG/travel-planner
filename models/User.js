import mongoose, {Schema, models} from "mongoose";

// STUB: create user schema
const userSchema = new Schema(
	{
		firstname: {
			type: String,
			required: [true, "Please add a first name"],
		},
		lastname: { type: String, required: [true, "Please add a last name"] },
		fullname: String,
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
	this.fullname = `${this.firstname} ${this.lastname}`;
	next();
});

// STUB: connect schema to users collection
const User = models.User || mongoose.model("User", userSchema);
export default User;