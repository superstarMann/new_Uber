import { ReportMovementsMutationArgs, ReportMovementsResponse } from './../../../types/graphql.d';
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/resolverMiddleware";
import User from '../../../entities/User';
import cleanNullArgs from '../../../utils/cleanNullArgs';

const resolvers: Resolvers = {
    Mutation: {
        ReportMovements:privateResolver(async(_, args: ReportMovementsMutationArgs, {req, pubSub}): Promise<ReportMovementsResponse> => {
            const user: User = req.user;
            const notNull = cleanNullArgs(args);
            try{
                await User.update({id: user.id}, {...notNull});
                pubSub.publish("driverUpdate", {DriversSubscription: user});
                return{
                    ok: true,
                    error: null
                };
            }catch(error){
                return{
                    ok: false,
                    error: error.message
                }
            }
        })
    }
}

export default resolvers;