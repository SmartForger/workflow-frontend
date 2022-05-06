import { omit } from 'lodash';
import CreateWorkflowWidgetSQL from 'src/common/graphql/workflow-widget/CreateWorkflowWidget';
import { WorkflowWidget } from '../../types/WorkflowWidget';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const createWorkflowWidget = (
  widget: WorkflowWidget
): Promise<WorkflowWidget> => {
  console.log(222, widget, isNewID(widget.layoutId) || isNewID(widget.stepId));
  return isNewID(widget.layoutId) || isNewID(widget.stepId)
    ? rejectParentRequired('stepId or layoutId is required')
    : client
        .mutate({
          mutation: CreateWorkflowWidgetSQL,
          variables: omit(widget, ['id']),
        })
        .then((response) => response.data.widget);
};
