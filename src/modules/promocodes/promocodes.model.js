import mongoose, { Schema } from 'mongoose';

const AvantageSchema = new Schema({
    percent: { type: Number, required: true }
});

const PromoCodeSchema = new Schema({
    name: { type: String, required: true, unique: true},
    avantage: { type: AvantageSchema, required: true},
    restrictions: {}
});

const PromoCodeModel = mongoose.model('PromoCode', PromoCodeSchema);

export default PromoCodeModel;
