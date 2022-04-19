import gql from 'graphql-tag';
import { omit } from 'lodash';
import { WorkflowWidget } from '../types/WorkflowWidget';
import client from './client';

export const createWorkflowWidget = (
  widget: WorkflowWidget
): Promise<WorkflowWidget> =>
  client
    .mutate({
      mutation: gql`
        mutation CreateWorkflowWidget(
          $type: String!
          $displayName: String!
          $description: String!
          $icon: String!
          $iconFileName: String!
          $field: String!
          $updateEvent: String!
          $stepId: String
          $layoutId: String
        ) {
          widget: createWorkflowWidget(
            widgetInput: {
              type: $type
              displayName: $displayName
              description: $description
              icon: $icon
              iconFileName: $iconFileName
              field: $field
              updateEvent: $updateEvent
              stepId: $stepId
              layoutId: $layoutId
            }
          ) {
            ...widgetFields
          }
        }

        fragment widgetFields on WorkflowWidget {
          id
          type
          displayName
          description
          icon
          iconFileName
          field
          updateEvent
        }
      `,
      variables: omit(widget, ['id']),
    })
    .then((response) => response.data.widget);
