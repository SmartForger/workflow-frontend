import gql from 'graphql-tag';
import { omit } from 'lodash';
import { WorkflowLayout } from '../types/WorkflowLayout';
import { isNewID, rejectParentRequired } from '../utils/api-utils';
import client from './client';
import { createWorkflowWidget } from './createWorkflowWidget';

const CreateWorkflowLayoutGQL = gql`
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
`;

const createWorkflowLayoutObject = (
  layout: WorkflowLayout
): Promise<WorkflowLayout> =>
  isNewID(layout.stepId)
    ? rejectParentRequired('stepId is required')
    : client
        .mutate({
          mutation: CreateWorkflowLayoutGQL,
          variables: omit(layout, ['id', 'widgets']),
        })
        .then((response) => ({ ...response.data.layout, widgets: [] }));

export const createWorkflowLayout = async (
  layout: WorkflowLayout
): Promise<WorkflowLayout> => {
  const newLayout = await createWorkflowLayoutObject({
    ...layout,
    visible: layout.visible ?? false,
  });

  newLayout.widgets = await Promise.all(
    (layout.widgets || []).map((widget) => {
      widget.layoutId = newLayout.id;
      return createWorkflowWidget(widget);
    })
  );

  return newLayout;
};
