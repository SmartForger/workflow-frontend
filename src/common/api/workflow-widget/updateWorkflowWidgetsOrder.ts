import UpdateWorkflowWidgetsOrderGQL from 'src/common/graphql/workflow-widget/UpdateWorkflowWidgetsOrder';
import { ItemOrder } from 'src/common/types/ItemOrder';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const updateWorkflowWidgetsOrder = (
  orders: ItemOrder[],
  WidgetId: string
): Promise<{ updated: boolean }> =>
  isNewID(WidgetId)
    ? rejectParentRequired(`The Widget is not saved in DB: ${WidgetId}`)
    : client
        .mutate({
          mutation: UpdateWorkflowWidgetsOrderGQL,
          variables: { orders: orders.filter((order) => !isNewID(order.id)) },
        })
        .then((response) => response.data.orders);
