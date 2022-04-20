import gql from 'graphql-tag';
import { omit } from 'lodash';
import { WorkflowWidget } from '../types/WorkflowWidget';
import { isNewID, rejectParentRequired } from '../utils/api-utils';
import client from './client';

const CreateWorkflowWidgetGQL = gql`
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
`;

export const createWorkflowWidget = (
  widget: WorkflowWidget
): Promise<WorkflowWidget> => {
  console.log(222, widget, isNewID(widget.layoutId) || isNewID(widget.stepId));
  return isNewID(widget.layoutId) || isNewID(widget.stepId)
    ? rejectParentRequired('stepId or layoutId is required')
    : client
        .mutate({
          mutation: CreateWorkflowWidgetGQL,
          variables: omit(widget, ['id']),
        })
        .then((response) => response.data.widget);
};
