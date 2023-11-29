import User from '../model/User.js';
import Wallet from '../model/Wallet.js';
import keys from '../utils/key.js';

class UserController {
    static create = async (req, res) => {
        const { fullName, email, documentNumber, password, role } = req.body;

        const username = email;
        let userId;
        try {
            const user = await User.create(
                {
                    fullName,
                    documentNumber,
                    email,
                    password,
                    username,
                    role
                }
            );
            if (!user) {
                return res.status(500).json({error: 'internal error'})
            }
            userId = user._id;
        } catch (error) {
            return res.status(500).json({error, message: 'user'})
        }
        try {
            const { publicKey, privateKey } = keys;
            const wallet = await Wallet.create({
                user:userId,
                publicKey,
                privateKey
            })
            if(!wallet){
                return res.status(500).json({error: 'internal error'})
            }

            return res.status(201).json({status: "OK"});
        } catch (error) {
            await User.deleteOne({ _id: userId })

        }
    }
    static get = async (req, res) => {
        const { id } = req.params;
        const user = await User.findOne({id});

        if (!user) {
            return 'error'
        }

        return res.json(user)
    }

    static login = async (req, res) =>{
        const {email, password} = req.body

        const user = await User.findOne({email, password});

        if(!user){
            return res.json({error: "invalid password or email " })
        }

    }

    static findAll = async (req, res) => {
        const users = await User.find();
        if (users.length < 1) {
            return res.json({ message: 'error' });
        }
        return res.json(users)
    }

    static update = async (req, res) => {
        const { fullName, email, documentNumber } = req.body;
        const { id } = req.params;

        const username = email;

        const user = await User.updateOne({_id:id},
            {
                fullName,
                username,
                email,
                documentNumber
            }
        );

        if (user.modifiedCount !== 1) {
            return res.json({ message: 'error' });
        }
        return res.json({status:"OK"});

    }

    static delete = async (req, res) => {
        const { id } = req.params;
        await User.deleteOne({_id:id});
        return res.status(204).json();
    }
}

export default UserController;