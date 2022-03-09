import imgModule from "../module/img.module.js";

const loadImg = (req, res, next) => {
 
    imgModule.loadImg(req.params.filename).then((result) => {        
        res.contentType(result.mimetype);
        res.send(result.img);
    }).catch((error) => {
        next(error)
    })
        

}
export default
{
    loadImg
}
