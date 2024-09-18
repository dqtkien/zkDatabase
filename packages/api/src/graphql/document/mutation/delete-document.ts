import pkg from '@apollo/client';
const { gql } = pkg;
import { NetworkResult, handleRequest } from "../../../utils/network.js";
import { MerkleWitness } from "../../types/merkle-tree.js";
import client from "../../client.js";

const DELETE_DOCUMENT = gql`
  mutation DocumentDrop(
    $databaseName: String!,
    $collectionName: String!,
    $documentQuery: JSON!
  ) {
    documentDrop(
      databaseName: $databaseName,
      collectionName: $collectionName,
      documentQuery: $documentQuery
    ) {
      isLeft
      sibling
    }
  }
`;


interface DocumentResponse {
  witness: MerkleWitness;
}

export const deleteDocument = async (
  databaseName: string,
  collectionName: string,
  documentQuery: JSON
): Promise<NetworkResult<MerkleWitness>> => {
  return handleRequest(async () => {
    const { data, errors } = await client.mutate({
      mutation: DELETE_DOCUMENT,
      variables: {
        databaseName,
        collectionName,
        documentQuery,
      }
    });

    const response = data?.documentDrop;

    if (response) {
      return {
        type: "success",
        data: response,
      };
    } else {
      return {
        type: "error",
        message: errors?.toString() ?? "An unknown error occurred",
      };
    }
  });
};