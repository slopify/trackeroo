import SessionsModel from "../schemas/Sessions.js";


export class SessionService {
    static async saveSession(session) {
        await SessionsModel.findOneAndUpdate(
            {key: session.id},
            {key: session.id, payload: JSON.stringify(session)},
            {new: true, useFindAndModify: false, upsert: true}
        );
        return true;
    }

    static async loadSession(id) {
        const session = await SessionsModel.find({key:id}, {payload: 1, _id:0}).lean();
        if (session) {
            return JSON.parse(session.payload);
        }
        return undefined;
    }

    static async deleteSession(id) {
        await SessionsModel.findOneAndRemove({key : id});
        return true;
    }
}