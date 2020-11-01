import { RequestRideMutationArgs, RequestRideResponse } from './../../../../types/graphql.d';
import { Resolvers } from 'Documents/GitHub/new_Uber/src/types/resolvers';
import User from 'Documents/GitHub/new_Uber/src/entities/User';
import privateResolver from 'Documents/GitHub/new_Uber/src/utils/resolverMiddleware';
import Ride from 'Documents/GitHub/new_Uber/src/entities/Ride';

const resolvers: Resolvers = {
    Mutation:{
        RequestRide: privateResolver(async ( _, args: RequestRideMutationArgs, {req}) : Promise<RequestRideResponse> =>{
            const user: User = req.user;
            try{
                const ride = await Ride.create({ ...args, passenger: user}).save();
                return{
                    ok: true,
                    error: null,
                    ride
                }
            }catch(error){
                return{
                ok: false,
                error: error.message,
                ride: null
                }
            }
        } )
    }
}

export default resolvers;