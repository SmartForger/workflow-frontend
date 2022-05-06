import { omit } from 'lodash';
import CreateWorkflowLayoutGQL from 'src/common/graphql/workflow-layout/CreateWorkflowLayout';
import { WorkflowLayout } from '../../types/WorkflowLayout';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';
import { createWorkflowWidget } from '../workflow-widget/createWorkflowWidget';

const createWorkflowLayoutObject = (layout: WorkflowLayout): Promise<WorkflowLayout> =>
  isNewID(layout.stepId)
    ? rejectParentRequired('stepId is required')
    : client
        .mutate({
          mutation: CreateWorkflowLayoutGQL,
          variables: omit(layout, ['id', 'widgets']),
        })
        .then((response) => ({ ...response.data.layout, widgets: [] }));

export const createWorkflowLayout = async (layout: WorkflowLayout): Promise<WorkflowLayout> => {
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
