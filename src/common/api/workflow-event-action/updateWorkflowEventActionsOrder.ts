import UpdateWorkflowEventActionsOrderGQL from 'src/common/graphql/workflow-event-action/UpdateWorkflowEventActionsOrder';
import { ItemOrder } from 'src/common/types/ItemOrder';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const updateWorkflowEventActionsOrder = (
  orders: ItemOrder[],
  stepId: string
): Promise<{ updated: boolean }> =>
  isNewID(stepId)
    ? rejectParentRequired(`The step is not saved in DB: ${stepId}`)
    : client
        .mutate({
          mutation: UpdateWorkflowEventActionsOrderGQL,
          variables: { orders: orders.filter((order) => !isNewID(order.id)) },
        })
        .then((response) => response.data.orders);
