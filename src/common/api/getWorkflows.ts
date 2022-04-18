import gql from 'graphql-tag';
import { Workflow } from '../types/Workflow';
import client from './client';

export const getWorkflows = (): Promise<Workflow[]> =>
  client
    .query({
      query: gql`
        query GetWorkflows {
          workflows {
            ...workflowFields
            steps {
              ...stepFields
              events {
                ...eventFields
              }
              widgets {
                ...widgetFields
              }
              layouts {
                ...layoutFields
              }
            }
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

        fragment stepFields on WorkflowStep {
          id
          name
          displayName
          description
          icon
          iconFileName
        }

        fragment eventFields on WorkflowEvent {
          id
          name
          description
          action
          condition
        }

        fragment widgetFields on WorkflowWidget {
          id
          type
          displayName
          description
          icon
          iconFileName
          field
          updateEvent
        }

        fragment layoutFields on WorkflowLayout {
          id
          title
          icon
          iconFileName
          backgroundColor
          textColor
          visible
          widgets {
            ...widgetFields
          }
        }
      `,
    })
    .then((response) => response.data.workflows);
