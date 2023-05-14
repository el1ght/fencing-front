import {mongooseConnect} from "@/lib/mongoose";
import {Tournament} from "@/models/Tournament";

export default async function handle(req, res) {
  await mongooseConnect();
  const {categories, sort, phrase, ...filters} = req.query;
  let [sortField, sortOrder] = (sort || '_id-desc').split('-');

  const tournamentsQuery = {};
  if (categories) {
    tournamentsQuery.category = categories.split(',');
  }
  if (phrase) {
    tournamentsQuery['$or'] = [
      {title:{$regex:phrase,$options:'i'}},
      {description:{$regex:phrase,$options:'i'}},
    ];
  }
  if (Object.keys(filters).length > 0) {
    Object.keys(filters).forEach(filterName => {
      tournamentsQuery['properties.'+filterName] = filters[filterName];
    });
  }
  res.json(await Tournament.find(
    tournamentsQuery,
    null,
    {
      sort:{[sortField]:sortOrder==='asc' ? 1 : -1}
    })
  );
}