import gql from 'graphql-tag';
import { omit } from 'lodash';
import { WorkflowLayout } from '../types/WorkflowLayout';
import { isNewID, rejectParentRequired } from '../utils/api-utils';
import client from './client';

const UpdateWorkflowLayoutGQL = gql`
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
`;

export const updateWorkflowLayout = (
  layout: WorkflowLayout
): Promise<WorkflowLayout> =>
  isNewID(layout.id)
    ? rejectParentRequired(`The layout is not saved in DB: ${layout.id}`)
    : client
        .mutate({
          mutation: UpdateWorkflowLayoutGQL,
          variables: omit(layout, ['widgets']),
        })
        .then((response) => ({ ...layout, ...response.data.layout }));
