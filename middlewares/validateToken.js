import db from "./../db.js";

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        const session = await db.collection("sessions").findOne({ token });
        console.log;

        if (!session) {
            res.sendStatus(401);
            return;
        }

        const user = await db
            .collection("users")
            .findOne({ _id: session.userId });

        if (!user) {
            res.send(401).message("Usuário não encontrado");
            return;
        }

        res.locals.user = user;

        next();
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }}