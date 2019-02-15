import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
});

const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;
