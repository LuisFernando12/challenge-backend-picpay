import Wallet from '../model/Wallet.js';

class WalletController {
    static get = async (req, res) => {
        const { id } = req.params;

        const wallet = await Wallet.findById(id).populate('transactions').populate('user');

        if(!wallet){
            return res.status(500).json({error: 'error'});
        }

        return res.json(wallet)
    }   
}

export default WalletController;