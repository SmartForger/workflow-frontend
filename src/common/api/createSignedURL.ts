import CreateSignedURLGQL from '../graphql/CreateSignedURL';
import client from './client';

export const createSignedURL = (
  fileName: string,
  contentType: string,
  origin: string
): Promise<{ url: string; newFileName: string; expiresAt: number }> =>
  client
    .mutate({
      mutation: CreateSignedURLGQL,
      variables: { fileName, contentType, origin },
    })
    .then((response) => response.data.createSignedURL);
