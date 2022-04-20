import gql from 'graphql-tag';
import { WorkflowWidget } from '../types/WorkflowWidget';
import { isNewID, rejectParentRequired } from '../utils/api-utils';
import client from './client';

const UpdateWorkflowWidgetGQL = gql`
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
`;

export const updateWorkflowWidget = (
  widget: WorkflowWidget
): Promise<WorkflowWidget> =>
  isNewID(widget.id)
    ? rejectParentRequired(`The widget is not saved in DB: ${widget.id}`)
    : client
        .mutate({
          mutation: UpdateWorkflowWidgetGQL,
          variables: widget,
        })
        .then((response) => response.data.widget);
