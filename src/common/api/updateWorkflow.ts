import gql from 'graphql-tag';
import { omit } from 'lodash';
import { Workflow } from '../types/Workflow';
import client from './client';

export const updateWorkflow = (workflow: Workflow): Promise<Workflow> =>
  client
    .mutate({
      mutation: gql`
        mutation UpdateWorkflow(
          $id: String!
          $category: String
          $subCategory: String
          $name: String
          $displayName: String
          $description: String
          $icon: String
          $iconFileName: String
        ) {
          workflow: updateWorkflow(
            workflowInput: {
              id: $id
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
      variables: omit(workflow, ['mode', 'steps']),
    })
    .then((response) => ({ ...response.data.workflow, steps: workflow.steps }));
