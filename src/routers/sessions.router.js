import { Router } from "express";

const router = Router()

router.get('/current', async (req,res) => {
    console.log(req.session);
})

export default router