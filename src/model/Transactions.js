import { Schema, default as mongoose } from 'mongoose';

const transactionSchema = new Schema({
    senderWallet: {
      type: Schema.Types.ObjectId,
      ref: 'wallet',
      required: true
    },
    senderFullName: {
      type: String,
      ref: 'user',
      required: true
    },
    senderDocument: {
      type: String,
      ref: 'user',
      required:true
    },
    recipientWallet: {
      type: Schema.Types.ObjectId,
      ref: 'wallet',
      required: true
    },
    recipientFullName: {
      type: String,
      ref: 'user',
      required: true
    },
    recipientDocument:{
      type: String,
      ref: 'user',
      required:true
    },
    amount: {
      type: Number,
      required: true
    },
    status:{
        type: String,
        enum: ['Effective', 'Falied', 'In Progress'],
        default: 'In Progress'
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  });
  
  const Transaction = mongoose.model('transaction', transactionSchema);
  
  export default Transaction;