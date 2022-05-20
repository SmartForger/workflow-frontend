import { isEmpty, omit } from 'lodash';
import CreateWorkflowWidgetSQL from 'src/common/graphql/workflow-widget/CreateWorkflowWidget';
import { transformWidget } from 'src/common/utils/transforms';
import { WorkflowWidget } from '../../types/WorkflowWidget';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const createWorkflowWidget = (widget: WorkflowWidget): Promise<WorkflowWidget> => {
  return isNewID(widget.layoutId) || isNewID(widget.stepId)
    ? rejectParentRequired('stepId or layoutId is required')
    : client
        .mutate({
          mutation: CreateWorkflowWidgetSQL,
          variables: {
            ...omit(widget, ['id', 'extra']),
            extra: isEmpty(widget.extra) ? null : JSON.stringify(widget.extra),
          },
        })
        .then((response) => response.data.widget)
        .then(transformWidget);
};
