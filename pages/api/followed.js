import { mongooseConnect } from "@/lib/mongoose";
import { Tournament } from "@/models/Tournament";

export default async function handle(req, res) {
    await mongooseConnect();
    const ids = req.body.ids;
    res.json(await Tournament.find({_id:ids}));
};
