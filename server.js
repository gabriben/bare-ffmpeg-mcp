#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const server = new Server({
  name: 'ffmpeg-server',
  version: '1.0.0',
}, {
  capabilities: { tools: {} },
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: 'ffmpeg',
    description: 'Execute ffmpeg commands',
    inputSchema: {
      type: 'object',
      properties: {
        args: { type: 'string', description: 'ffmpeg arguments' }
      },
      required: ['args']
    }
  }]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'ffmpeg') {
    try {
      const { stdout, stderr } = await execAsync(`ffmpeg ${request.params.arguments.args}`);
      return { content: [{ type: 'text', text: stdout || stderr }] };
    } catch (error) {
      return { content: [{ type: 'text', text: `Error: ${error.message}` }] };
    }
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
