import gql from 'graphql-tag';
import { WorkflowWidget } from '../types/WorkflowWidget';
import client from './client';

export const updateWorkflowWidget = (
  widget: WorkflowWidget
): Promise<WorkflowWidget> =>
  client
    .mutate({
      mutation: gql`
        mutation UpdateWorkflowWidget(
          $id: String!
          $type: String
          $displayName: String
          $description: String
          $icon: String
          $field: String
          $updateEvent: String
          $stepId: String
          $layoutId: String
        ) {
          widget: updateWorkflowWidget(
            widgetInput: {
              id: $id
              type: $type
              displayName: $displayName
              description: $description
              icon: $icon
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
      variables: widget,
    })
    .then((response) => response.data.widget);
