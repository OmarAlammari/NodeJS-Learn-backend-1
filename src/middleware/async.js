module.exports = (routeHandler) => {
    return async function (req, res, nxt) {
        try {
            // businessLogic
            await routeHandler(req, res);
        } catch (err) {
            nxt(err);
        }
    }
}