import DeleteWorkflowWidgetGQL from 'src/common/graphql/workflow-widget/DeleteWorkflowWidget';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const deleteWorkflowWidget = (id: string): Promise<string> =>
  isNewID(id)
    ? rejectParentRequired(`The widget is not saved in DB: ${id}`)
    : client
        .mutate({
          mutation: DeleteWorkflowWidgetGQL,
          variables: { id },
        })
        .then((response) => response.data.widget.id);
