import { EmailSignUpResponse, EmailSignUpMutationArgs } from './../../../types/graphql.d';
import { Resolvers } from './../../../types/resolvers.d';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';
import Verification from '../../../entities/Verification';
const resolvers: Resolvers = {
    Mutation: {
        EmailSignUp:async(_, args: EmailSignUpMutationArgs): Promise<EmailSignUpResponse> => {
            const {email} = args;
            try{
                const existingUser = await User.findOne({email});
                if(existingUser){
                    return{
                        ok: true,
                        error: `You should log in instead`,
                        token: null
                    };
                }else{
                    const newUser = await User.create({...args}).save();
                    if(newUser.email){
                        const emailVerification = await Verification.create({
                            payload: newUser.email,
                            target: "EMAIL"
                        }).save()
                    }
                    const token = createJWT(newUser.id);
                    return{
                        ok: true,
                        error: null,
                        token
                    };
                }
            }catch(error){
                return{
                    ok: false,
                    error: error.message,
                    token: null
                };
            }
        }
    }
};

export default resolvers;