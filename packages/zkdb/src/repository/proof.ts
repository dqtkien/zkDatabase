import { JsonProof } from 'o1js';
import { ProofStatus } from '../types/proof.js';
import { TProofStatus } from '@zkdb/api';
import { AppContainer } from '../container.js';

export async function getProof(databaseName: string): Promise<JsonProof> {
  const result = await AppContainer.getInstance().getApiClient().proof.get({ databaseName });

  return result.unwrap();
}

export async function getProofStatus(
  databaseName: string,
  collectionName: string,
  documentId: string
): Promise<ProofStatus> {
  const result = await AppContainer.getInstance().getApiClient().proof.status({
    databaseName,
    collectionName,
    docId: documentId,
  });

  switch (result.unwrap()) {
    case TProofStatus.QUEUED:
      return 'queue';
    case TProofStatus.PROVING:
      return 'proving';
    case TProofStatus.PROVED:
      return 'proved';
    case TProofStatus.FAILED:
      return 'failed';
  }
  
  throw Error('Failed to retrieve proof status')
}
