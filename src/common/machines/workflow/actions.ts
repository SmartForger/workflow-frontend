/* eslint-disable @typescript-eslint/no-explicit-any */
import { WorkflowEvent } from 'src/common/types/WorkflowEvent';
import { WorkflowEventAction } from 'src/common/types/WorkflowEventAction';
import { WorkflowStepMeta } from 'src/common/types/WorkflowMachine';

const handleMilestone = (context: any, action: WorkflowEventAction) => {
  console.log('Milestone: ' + action.info.content);
};

const handleTransaction = (context: any, action: WorkflowEventAction) => {
  console.log('Transaction: ' + action.info.content);
};

const handleAction = (context: any, ev: any, actionMeta: any) => {
  console.log(111, actionMeta);
  const events: WorkflowEvent[] = (Object.values(actionMeta.state.meta)[0] as WorkflowStepMeta)
    .events;
  const event = events.find((e) => e.name === ev.type);

  event?.actions?.forEach((action) => {
    switch (action?.info?.type) {
      case 'milestone':
        handleMilestone(context, action);
        break;
      case 'transaction':
        handleTransaction(context, action);
        break;
    }
  });
};

const updateData = (context: any, ev: any) => {
  context[ev.field] = ev.value;
};

export default {
  actions: { handleAction, updateData },
};
