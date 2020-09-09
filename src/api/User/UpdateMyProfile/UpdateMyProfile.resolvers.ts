import { UpdateMyProfileMutationArgs } from './../../../types/graphql.d';
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/resolverMiddleware";

const resolvers : Resolvers = {
    Mutation: {
        UpdateMyProfile:privateResolver(async(_,args:UpdateMyProfileMutationArgs, {req}) => {
            const user = req.user;
            
        })
    }
}

export default resolvers;