import * as pkg from "@apollo/client";
import { createMutateFunction, TApolloClient } from "./common.js";
import { TOwnership, TOwnershipRequest } from "./types/ownership.js";
import { TUser } from "./types/user.js";

const { gql } = pkg;

export type TUserSignUpRecord = TUser;

export const ownership = <T>(client: TApolloClient<T>) => ({
  setOwnership: createMutateFunction<
    Pick<TOwnership, "userName" | "groupName">,
    TOwnershipRequest & { grouping: string; newOwner: string },
    { permissionOwn: Pick<TOwnership, "userName" | "groupName"> }
  >(
    client,
    gql`
      mutation PermissionOwn(
        $databaseName: String!
        $collection: String!
        $docId: String
        $grouping: PermissionGroup!
        $newOwner: String!
      ) {
        permissionOwn(
          databaseName: $databaseName
          collection: $collection
          docId: $docId
          grouping: $grouping
          newOwner: $newOwner
        ) {
          userName
          groupName
        }
      }
    `,
    (data) => data.permissionOwn
  ),
});
