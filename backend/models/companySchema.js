import { Schema, model } from 'mongoose';

const companySchema = new Schema({
    companyName: { type: String, required: true },
    vatNumber: { type: String, required: true },
    address: {
        street: String,
        city: String,
        postalCode: String,
        province: String,
        country: String,
    },
    logo: { type: String },
    email: {
        type: String, 
        required: [true, "Please enter an email"],
        lowercase: true, // converte in minuscolo
        trim: true,
        unique: true
    },
    IBAN: { type: String, required: true },
    admins: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    jobs: [{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }],
    materials: [{
        type: Schema.Types.ObjectId,
        ref: 'Material'
    }],
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    balance: { type: Number, default: 0 }, 
    createdAt: { type: Date, default: Date.now }
}, { collection: 'companies' });

export default model('Company', companySchema)
