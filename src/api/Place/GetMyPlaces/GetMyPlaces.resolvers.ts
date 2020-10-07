import { GetMyPlacesResponse} from './../../../types/graphql.d';
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/resolverMiddleware";
import User from '../../../entities/User';

const resolvers : Resolvers = {
    Query : {
        GetMyPlaces: privateResolver(async(_, __, {req}): Promise<GetMyPlacesResponse> => {
            try{
                const user = await User.findOne({id: req.user.id}, {relations:["places"]});
                if(user){
                    return{
                        ok: true,
                        places: user.places,
                        error: null
                    };
                }else{
                    return{
                        ok: false,
                        error: `User not found`,
                        places: null
                    }
                }
            }catch(error){
                return{
                    ok: false,
                    error: error.Message,
                    places: null
                }
            }
        })
    }
}

export default resolvers;