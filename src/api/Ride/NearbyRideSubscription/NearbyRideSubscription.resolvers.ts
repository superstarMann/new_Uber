import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
    Subscription: {
        NearbyRideSubscription: {
            subscribe: withFilter(
                (_, __, {pubSub}) => pubSub.asyncIterator("rideRequest"),
                (payload, _, { context }) =>{
                    const user: User = context.currentUser;
                    const {
                        NearbyRideSubscription: { pickUpLat, pickUpLng }
                    } = payload;
                    const { lastLat: userLat, lastLng: userLng} = user;
                    return(
                        pickUpLat >= userLat -0.05 &&
                        pickUpLat <= userLat +0.05 &&
                        pickUpLng >= userLng -0.05 &&
                        pickUpLng <= userLng +0.05
                    );
                }
            )
        }        
    }
}

export default resolvers;