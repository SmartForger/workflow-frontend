import gql from 'graphql-tag';
import client from './client';

const CreateSignedURLGQL = gql`
  mutation CreateSignedURL(
    $fileName: String!
    $contentType: String!
    $origin: String!
  ) {
    createSignedURL(
      input: { fileName: $fileName, contentType: $contentType, origin: $origin }
    ) {
      url
      newFileName
      expiresAt
    }
  }
`;

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
