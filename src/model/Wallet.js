import { Schema, default as mongoose } from 'mongoose';

const WalletSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    publicKey: {
        type: String,
        required: true,
        unique: true,
    },
    privateKey: {
        type: String,
        required: true,
        unique: true,
        select:false
    },
    transactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'transaction'
        }
    ],
    created_at:{
        type: Date,
        default: Date.now
    }
});

const Wallet =  mongoose.model('wallet', WalletSchema);

export default Wallet;