import gql from 'graphql-tag';
import { omit } from 'lodash';
import { WorkflowLayout } from '../types/WorkflowLayout';
import { isNewID, rejectParentRequired } from '../utils/api-utils';
import client from './client';

export const createWorkflowLayout = (
  layout: WorkflowLayout
): Promise<WorkflowLayout> =>
  isNewID(layout.stepId)
    ? rejectParentRequired('stepId is required')
    : client
        .mutate({
          mutation: gql`
            mutation CreateWorkflowLayout(
              $title: String!
              $icon: String!
              $iconFileName: String!
              $backgroundColor: String!
              $textColor: String!
              $visible: Boolean!
              $stepId: String!
            ) {
              layout: createWorkflowLayout(
                layoutInput: {
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
          variables: omit(layout, ['id', 'widgets']),
        })
        .then((response) => ({ ...response.data.layout, widgets: [] }));
