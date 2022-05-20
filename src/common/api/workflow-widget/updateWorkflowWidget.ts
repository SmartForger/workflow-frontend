import { isEmpty } from 'lodash';
import UpdateWorkflowWidgetGQL from 'src/common/graphql/workflow-widget/UpdateWorkflowWidget';
import { transformWidget } from 'src/common/utils/transforms';
import { WorkflowWidget } from '../../types/WorkflowWidget';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const updateWorkflowWidget = (widget: WorkflowWidget): Promise<WorkflowWidget> =>
  isNewID(widget.id)
    ? rejectParentRequired(`The widget is not saved in DB: ${widget.id}`)
    : client
        .mutate({
          mutation: UpdateWorkflowWidgetGQL,
          variables: {
            ...widget,
            extra: isEmpty(widget.extra) ? null : JSON.stringify(widget.extra),
            rules: isEmpty(widget.rules) ? null : JSON.stringify(widget.rules),
          },
        })
        .then((response) => response.data.widget)
        .then(transformWidget);
