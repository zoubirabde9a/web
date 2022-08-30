import express from 'express';
import User from '../models/user.js';


const router = express.Router();

router.get('/', async (req, res) =>
{
    const {skip, limit} = req.query;

    try
    {
        const userList = await User.findAll();
        res.status(200).json(userList);
    }
    catch(error)
    {
        res.status(404).json({message: error.message});
    }
})

router.post('/', async (req, res) =>
{
    console.log(req.body);
});

router.post('/login', async (req, res) =>
{
    const {username, password} = req.body;
    const session = req.session;

    try
    {
        const user = await User.findOne({
            where:{
                username: username,
                password: password
            }
        });

        if (user)
        {
            session.userid = user.id;
        }

        res.cookie(session)
        res.status(200).json(user);
    }
    catch(error)
    {
        res.status(404).json({message: error.message});
    }
})

export default router;