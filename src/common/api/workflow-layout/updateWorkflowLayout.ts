import { omit } from 'lodash';
import UpdateWorkflowLayoutGQL from 'src/common/graphql/workflow-layout/UpdateWorkflowLayout';
import { WorkflowLayout } from '../../types/WorkflowLayout';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const updateWorkflowLayout = (
  layout: WorkflowLayout
): Promise<WorkflowLayout> =>
  isNewID(layout.id)
    ? rejectParentRequired(`The layout is not saved in DB: ${layout.id}`)
    : client
        .mutate({
          mutation: UpdateWorkflowLayoutGQL,
          variables: omit(layout, ['widgets']),
        })
        .then((response) => ({ ...layout, ...response.data.layout }));
