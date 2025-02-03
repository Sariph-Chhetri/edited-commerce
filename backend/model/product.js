import mongoose from "mongoose";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid"; // Import UUID to generate unique identifiers

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name must be provided"],
        unique: true
    },
    slug: {
        type: String,
        unique: true
    },
    category: {
        type: String,
        enum: {
            values: ['men', 'women', 'kids'],
            message: "Category must be either 'men', 'women', or 'kids'"
        },
        required: [true, "Category must be provided"]
    },
    image: {
        type: String,
        default: "https://picsum.photos/300"
    },
    new_price: {
        type: Number,
        required: [true, "New price must be provided"]
    },
    old_price: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    }
});

// Middleware to generate a unique slug before saving
productSchema.pre("save", async function (next) {
    if (!this.slug) {
        let slugBase = slugify(this.name, { lower: true, strict: true });
        let slug = slugBase;

        // Check if slug already exists
        let productExists = await mongoose.model("Product").findOne({ slug });
        if (productExists) {
            // Append a unique short ID to make it unique
            slug = `${slugBase}-${uuidv4().slice(0, 6)}`;
        }

        this.slug = slug;
    }
    next();
});

export default mongoose.model("Product", productSchema);
