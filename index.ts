import { INodeType } from 'n8n-workflow';
import { JsonInput } from './JsonInput.node';

export const nodeTypes: INodeType[] = [
  new JsonInput(),
];
