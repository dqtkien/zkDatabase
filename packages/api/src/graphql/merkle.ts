import * as pkg from "@apollo/client";
import { createQueryFunction, TApolloClient } from "./common.js";
import { TMerkleWitness } from "./types/merkle-tree.js";

const { gql } = pkg;

export const merkle = <T>(client: TApolloClient<T>) => ({
  root: createQueryFunction<
    string,
    { databaseName: string },
    { getRoot: string }
  >(
    client,
    gql`
      query GetRoot($databaseName: String!) {
        getRoot(databaseName: $databaseName)
      }
    `,
    (data) => data.getRoot
  ),
  witness: createQueryFunction<
    TMerkleWitness,
    { databaseName: string; docId: string },
    { getWitnessByDocument: TMerkleWitness }
  >(
    client,
    gql`
      query GetWitness($databaseName: String!, $docId: String!) {
        getWitnessByDocument(databaseName: $databaseName, docId: $docId) {
          isLeft
          sibling
        }
      }
    `,
    (data) => data.getWitnessByDocument
  ),
});
