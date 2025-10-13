import { NodeExecuteFunctions } from 'n8n-core';
import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class JsonInput implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Json Input',
    name: 'jsonInput',
    group: ['transform'],
    version: 1,
    description: 'A custom node that accepts JSON input',
    defaults: {
      name: 'Json Input',
      color: '#1F8EB2',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Content (JSON)',
        name: 'content',
        type: 'json',
        default: '',
        description: 'Input your JSON here',
      },
    ],
  };

  async execute(this: NodeExecuteFunctions) {
    const items = this.getInputData();
    const returnData = [];

    const content = this.getNodeParameter('content', 0);

    // Validate and parse JSON
    let parsedContent;
    try {
      if (typeof content === 'string') {
        parsedContent = JSON.parse(content);
      } else {
        parsedContent = content;
      }
    } catch (error) {
      throw new Error(`Invalid JSON provided: ${(error as Error).message}`);
    }

    // If there are input items, merge the JSON content with them
    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        // Merge input data with the provided JSON
        returnData.push({
          json: {
            ...items[i].json,
            ...parsedContent
          }
        });
      }
    } else {
      // If no input items, create new items with the JSON content
      returnData.push({ json: parsedContent });
    }

    return this.prepareOutputData(returnData);
  }
}
