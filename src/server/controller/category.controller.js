import categoryModule from "../module/category.module.js";

const getCategories = (req, res, next) => {
  categoryModule.getCategories(req.user).then((result) => {
    res.send(result);
  }).catch((error) => {next(error);});
}

export default
{
    getCategories
}