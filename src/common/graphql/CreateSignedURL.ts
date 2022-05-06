import gql from 'graphql-tag';

export default gql`
  mutation CreateSignedURL($fileName: String!, $contentType: String!, $origin: String!) {
    createSignedURL(input: { fileName: $fileName, contentType: $contentType, origin: $origin }) {
      url
      newFileName
      expiresAt
    }
  }
`;
