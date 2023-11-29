import Transaction from '../model/Transactions.js';
import User from '../model/User.js';
import Wallet from '../model/Wallet.js';
import sendMail from '../utils/sendMail.js';

class TransactionController {
    static create = async (req, res) => {
        const { senderWallet, recipientWallet, amount } = req.body;

        
        const walletReciverDB = await Wallet.findById(recipientWallet).populate('user');
        const walletSenderDB = await Wallet.findById(senderWallet).populate('user');
        
        if (walletSenderDB) {
            
            if(walletSenderDB.user.role === 'storeKeeper'){
                return  res.json({error:'UNAUTHORIZED', status:401});
            }
            
            if (walletSenderDB.balance >= amount) {
                if (walletReciverDB) {
                    try {
                        const transaction = await Transaction.create({
                            senderWallet,
                            senderFullName: walletSenderDB.user.fullName,
                            senderDocument: walletSenderDB.user.documentNumber,
                            recipientWallet,
                            recipientFullName:walletReciverDB.user.fullName,
                            recipientDocument: walletReciverDB.user.documentNumber,
                            amount
                        });
                
                        if (!transaction) {
                            return res.status(500).json();
                        }
                        const approveTransaction = await fetch("https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc")
                        if(!approveTransaction){
                            await Transaction.updateOne({ _id: transaction._id }, { status: 'Falied' });
                            throw new Error("Transaction unauthorized")
                        }
                        const balance = walletReciverDB.balance + amount;
                        const transactions = [...walletReciverDB.transactions, transaction._id];
                        const recipientWalletDB = await Wallet.updateOne({ _id: recipientWallet }, { balance, transactions });

                        if (recipientWalletDB.modifiedCount === 1) {
                            const balance = walletSenderDB.balance - amount;
                            const transactions = [...walletSenderDB.transactions, transaction._id]
                            const senderWalletDB = await Wallet.updateOne({ _id: senderWallet }, { balance, transactions });
                            if (senderWalletDB.modifiedCount === 1) {
                                await sendMail(walletReciverDB.user.email, walletReciverDB.user.fullName)
                                const transactionsDB = await Transaction.updateOne({ _id: transaction._id }, { status: 'Effective' });
                                if (transactionsDB.modifiedCount === 1) {
                                    return res.status(201).json();
                                }
                            }
                        }
                    } catch (error) {
                        return error;
                    }
                }
            }
        }

    }
}

export default TransactionController;