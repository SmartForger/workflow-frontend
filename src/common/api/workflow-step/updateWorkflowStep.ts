import { omit } from 'lodash';
import UpdateWorkflowStepGQL from 'src/common/graphql/workflow-step/UpdateWorkflowStep';
import { WorkflowStep } from '../../types/WorkflowStep';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const updateWorkflowStep = (step: WorkflowStep): Promise<WorkflowStep> =>
  isNewID(step.id)
    ? rejectParentRequired(`The step is not saved in DB: ${step.id}`)
    : client
        .mutate({
          mutation: UpdateWorkflowStepGQL,
          variables: omit(step, ['widgets', 'events', 'layouts']),
        })
        .then((response) => ({ ...step, ...response.data.step }));
