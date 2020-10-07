import { GetNearbyDriversResponse } from "../../../types/graphql";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/resolverMiddleware";

const resolvers : Resolvers = {
    Query:{
        GetNearbyDrivers:privateResolver(async(_, __, {req}): Promise<GetNearbyDriversResponse> => {
            try{

            }catch(error){
                return{
                    ok: false,
                    error: error.message,
                    drivers: null
                };
            }
        })
    }
};

export default resolvers;