import { keyBy } from 'lodash';
import { SelectOption } from '../types/SelectOption';

export const componentTypes: SelectOption[] = [
  { value: 'input', label: 'Input' },
  { value: 'select', label: 'Select' },
  { value: 'file', label: 'File' },
  { value: 'video', label: 'Video Player' },
  { value: 'recorder', label: 'Video Recorder' },
  { value: 'signature', label: 'Signature Pad' },
  { value: 'barcode', label: 'Barcode Scanner' },
  { value: 'picture', label: 'Take a picture' },
  { value: 'showdata', label: 'Show Data' },
];

export const componentTypesByValue = keyBy(componentTypes, 'value');
