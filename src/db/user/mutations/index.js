import { createUser, updateUser, getSessionToken } from "./mutationResolvers";

module.exports = {
  Mutation: {
    createUser,
    updateUser,
    getSessionToken
    // currentUser,
    // searchUsers
  }
};
