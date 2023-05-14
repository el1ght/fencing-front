import { mongooseConnect } from "@/lib/mongoose";
import { Subscription } from "@/models/Subscription";
import { Tournament } from "@/models/Tournament";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.json('should be a POST request');
        return;
    }
    const {
        email, followedTournaments
    } = req.body;
    await mongooseConnect();
    const tournamentsIds = followedTournaments;

    const uniqueIds = [...new Set(tournamentsIds)];
    const tournamentsInfos = await Tournament.find({_id:uniqueIds});

    let line_items = [];
    for (const tournamentId of uniqueIds) {
        const tournamentInfo = tournamentsInfos.find(p => p._id.toString() === tournamentId);
        const quantity = tournamentsIds.filter(id => id === tournamentId)?.length || 0;
        if (quantity > 0 && tournamentInfo) {
            line_items.push({
                quantity,
                data: {
                    tournament_data: {name: tournamentInfo.title},
                },
            });
        }

    }
    const subscriptionDoc = await Subscription.create({
        line_items, email,
    });

    res.json({line_items});

};
