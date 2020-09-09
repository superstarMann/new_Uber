import { ToggleDrivingModeResponse } from './../../../types/graphql.d';
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/resolverMiddleware";
import User from '../../../entities/User';

const resolvers: Resolvers = {
    Mutation:{
        ToggleDriving: privateResolver(async(_, __, {req}): Promise<ToggleDrivingModeResponse> => {
            const user: User = req.user;
            user.isDriving = !user.isDriving;
            user.save();
            return{
                ok: true,
                error: null
            }
        })
    }
}

export default resolvers;