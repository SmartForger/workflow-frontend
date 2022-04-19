import gql from 'graphql-tag';
import { omit } from 'lodash';
import { WorkflowLayout } from '../types/WorkflowLayout';
import client from './client';

export const updateWorkflowLayout = (
  layout: WorkflowLayout
): Promise<WorkflowLayout> =>
  client
    .mutate({
      mutation: gql`
        mutation UpdateWorkflowLayout(
          $id: String!
          $title: String
          $icon: String
          $iconFileName: String
          $backgroundColor: String
          $textColor: String
          $visible: Boolean
          $stepId: String
        ) {
          layout: updateWorkflowLayout(
            layoutInput: {
              id: $id
              title: $title
              icon: $icon
              iconFileName: $iconFileName
              backgroundColor: $backgroundColor
              textColor: $textColor
              visible: $visible
              stepId: $stepId
            }
          ) {
            ...layoutFields
          }
        }

        fragment layoutFields on WorkflowLayout {
          id
          title
          icon
          iconFileName
          backgroundColor
          textColor
          visible
        }
      `,
      variables: omit(layout, ['widgets']),
    })
    .then((response) => ({ ...layout, ...response.data.layout }));
