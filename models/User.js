import mongoose, {Schema, models} from "mongoose";

// TODO: add validation for email field

// create user schema
const userSchema = new Schema(
	{
		firstName: {
			type: String,
			maxLength: [50, "firstName cannot exceed 50 characters"],
			required: [true, "Please add a first name"],
		},
		lastName: { type: String, maxLength: [50, "lastName cannot exceed 50 characters"], required: [true, "Please add a last name"],  },
		fullName: String,
		email: {
			type: String,
			maxLength: [50, "email cannot exceed 50 characters"],
			required: [true, "Please add an email"],
			unique: true,
		},
		phoneNumber: { type: String, minLength: [7, "phoneNumber cannot be less than 7 characters"],maxLength: [15, "phoneNumber cannot exceed 15 characters"], required: [true, "Please add a phone number"], },
		password: { type: String, required: [true, "Please add a password"] },
		contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact' }],
		createdAt: { type: Date, default: Date.now },
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// create fullname field from the first & last name
userSchema.pre("save", function (next) {
	this.fullName = `${this.firstName} ${this.lastName}`;
	next();
});

// cascade delete trips when a user is deleted
userSchema.pre("remove", async function (next) {
	await this.model("Trips").deleteMany({ userID: this._id });
	next();
});

// reverse populate with virtuals
userSchema.virtual("trips", {
	ref: "Trips",
	localField: "_id",
	foreignField: "userID",
});

// connect schema to users collection
const User = models.User || mongoose.model("User", userSchema);
export default User;