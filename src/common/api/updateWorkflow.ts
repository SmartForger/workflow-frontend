import gql from 'graphql-tag';
import { omit } from 'lodash';
import { Workflow } from '../types/Workflow';
import { isNewID, rejectParentRequired } from '../utils/api-utils';
import client from './client';

const UpdateWorkflowGQL = gql`
  mutation UpdateWorkflow(
    $id: String!
    $category: String
    $subCategory: String
    $name: String
    $displayName: String
    $description: String
    $icon: String
    $iconFileName: String
  ) {
    workflow: updateWorkflow(
      workflowInput: {
        id: $id
        category: $category
        subCategory: $subCategory
        name: $name
        displayName: $displayName
        description: $description
        icon: $icon
        iconFileName: $iconFileName
      }
    ) {
      ...workflowFields
    }
  }

  fragment workflowFields on Workflow {
    id
    name
    category
    subCategory
    name
    displayName
    description
    icon
    iconFileName
  }
`;

export const updateWorkflow = (workflow: Workflow): Promise<Workflow> =>
  isNewID(workflow.id)
    ? rejectParentRequired(`The workflow is not saved in DB: ${workflow.id}`)
    : client
        .mutate({
          mutation: UpdateWorkflowGQL,
          variables: omit(workflow, ['mode', 'steps']),
        })
        .then((response) => ({
          ...response.data.workflow,
          steps: workflow.steps,
        }));
