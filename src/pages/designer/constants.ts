import { WorkflowStep } from 'src/common/types/WorkflowStep';

export const workflowCategories = [
  'Cargo Security',
  'Freight Forwarding',
  'Warehouse Handling',
];

export const workflowVerticals = ['Cargo Screening', 'C-TAPT'];

export const workflowModes = ['Single Shipments', 'Containerized Shipments'];

export const sampleWorkflows = [
  {
    id: 1,
    category: 'Cargo Handling',
    subCategory: 'Cargo Screening',
    name: 'K9Screening',
    mode: 'Single Shipments',
    displayName: 'K9-Ad-Hawk',
    description: 'Screen cargo using canine and record video on nose odor',
    icon: 'img:/src/assets/images/k9_setup_screening.svg',
  },
  {
    id: 2,
    category: 'Cargo Handling',
    subCategory: 'Cargo Loader',
    name: 'Cargo Loader',
    mode: 'Assembly',
    displayName: 'Cargo Loader',
    description: 'Load Cargo onto pallets and ULDs.',
    icon: 'img:/src/assets/images/cargo_loader.svg',
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    name: 'screeningSetup',
    displayName: 'Screening Setup',
    description: 'Setup screening task',
    icon: 'img:/src/assets/images/k9_setup_screening.svg',
  },
  {
    id: 2,
    name: 'createManifest',
    displayName: 'Create Manifest',
    description: 'Create Manifest',
    icon: 'img:/src/assets/images/K9_setup_manifest.svg',
  },
  {
    id: 3,
    name: 'confirmManifest',
    displayName: 'Confirm Manifest',
    description: 'Confirm Manifest',
    icon: 'img:/src/assets/images/confirm_manifest.svg',
  },
  {
    id: 4,
    name: 'Select Camera',
    displayName: 'Select Camera',
    description: 'Select Camera',
    icon: 'img:/src/assets/images/k9_video_camera.svg',
  },
  {
    id: 5,
    name: 'Live Screening',
    displayName: 'Live Screening',
    description: 'Live Screening',
    icon: 'img:/src/assets/images/k9_screening_cargo.svg',
  },
  {
    id: 6,
    name: 'Preview Video',
    displayName: 'Preview Video',
    description: 'Preview Video',
    icon: 'img:/src/assets/images/k9_video_approved.svg',
  },
  {
    id: 7,
    name: 'Finalize Screening',
    displayName: 'Finalize Screening',
    description: 'Finalize Screening',
    icon: 'img:/src/assets/images/k9_screening_completed.svg',
  },
];
