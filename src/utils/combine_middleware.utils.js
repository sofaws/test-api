export default function combineMiddlewares(middleware) {
    return middleware.reduce((a, b) => {
        return (req, res, next) => {
            a(req, res, (err) => {
                if(err) {
                    return next(err);
                }
                b(req, res, next)
            })
        }
    })
}
