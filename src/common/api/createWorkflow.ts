import gql from 'graphql-tag';
import { omit } from 'lodash';
import { Workflow } from '../types/Workflow';
import client from './client';

export const createWorkflow = (workflow: Workflow): Promise<Workflow> =>
  client
    .mutate({
      mutation: gql`
        mutation CreateWorkflow(
          $category: String!
          $subCategory: String!
          $name: String!
          $displayName: String!
          $description: String!
          $icon: String!
          $iconFileName: String!
        ) {
          workflow: createWorkflow(
            workflowInput: {
              category: $category
              subCategory: $subCategory
              name: $name
              displayName: $displayName
              description: $description
              icon: $icon
              iconFileName: $iconFileName
            }
          ) {
            ...workflowFields
          }
        }

        fragment workflowFields on Workflow {
          id
          name
          category
          subCategory
          name
          displayName
          description
          icon
          iconFileName
        }
      `,
      variables: omit(workflow, ['id', 'mode', 'steps']),
    })
    .then((response) => ({ ...response.data.workflow, steps: [] }));
