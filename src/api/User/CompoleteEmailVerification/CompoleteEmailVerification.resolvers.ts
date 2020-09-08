import { CompoleteEmailVerificationMutationArgs, CompoleteEmailVerificationResponse } from './../../../types/graphql.d';
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/resolverMiddleware";
import User from '../../../entities/User';
import Verification from '../../../entities/Verification';

const resolvers : Resolvers = {
    Mutation : {
        CompoleteEmailVerification:privateResolver(async(_,args: CompoleteEmailVerificationMutationArgs, {req}):Promise<CompoleteEmailVerificationResponse> => {
            const user: User = req.user;
            const {key} = args;
            if(user.email){
                try{
                    const verification = await Verification.findOne({key, payload: user.email})
                    if(verification){
                        user.verifiedEmail = true;
                        user.save();
                        return{
                            ok: true,
                            error: null
                        }
                    }else{
                        return{
                            ok: false,
                            error: `Can't verify Email`
                        }
                    }
                }catch(error){
                    return {
                        ok: false,
                        error: error.message
                    }
                }
            }else{
                return{
                    ok: false,
                    error: `No email to verify`
                }
            }
        })
    }
}