import UpdateWorkflowWidgetGQL from 'src/common/graphql/workflow-widget/UpdateWorkflowWidget';
import { WorkflowWidget } from '../../types/WorkflowWidget';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

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
