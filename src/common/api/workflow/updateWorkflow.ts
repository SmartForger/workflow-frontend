import { omit } from 'lodash';
import UpdateWorkflowGQL from 'src/common/graphql/workflow/UpdateWorkflow';
import { Workflow } from '../../types/Workflow';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const updateWorkflow = (workflow: Workflow): Promise<Workflow> =>
  isNewID(workflow.id)
    ? rejectParentRequired(`The workflow is not saved in DB: ${workflow.id}`)
    : client
        .mutate({
          mutation: UpdateWorkflowGQL,
          variables: omit(workflow, ['steps']),
        })
        .then((response) => ({
          ...response.data.workflow,
          steps: workflow.steps,
        }));
