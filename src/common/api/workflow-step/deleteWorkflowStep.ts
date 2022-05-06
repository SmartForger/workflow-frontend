import DeleteWorkflowStepGQL from 'src/common/graphql/workflow-step/DeleteWorkflowStep';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const deleteWorkflowStep = (id: string): Promise<string> =>
  isNewID(id)
    ? rejectParentRequired(`The step is not saved in DB: ${id}`)
    : client
        .mutate({
          mutation: DeleteWorkflowStepGQL,
          variables: { id },
        })
        .then((response) => response.data.step.id);
