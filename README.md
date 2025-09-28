# bare-ffmpeg-mcp

A bare Model Context Protocol (MCP) server for ffmpeg integration, for now with no opinions at all.

## Prerequisites

`node`, `ffmpeg`

## Claude Desktop Integration

To use this MCP server with Claude Desktop, you need to add it to your Claude Desktop configuration.

1. Open your Claude Desktop configuration file:

   - **Mac**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. Add the following configuration to your `mcpServers` section (replace `/path/to/your/bare-ffmpeg-mcp` with the actual path to this project folder):

```json
{
  "mcpServers": {
    "ffmpeg": {
      "command": "node",
      "args": "/path/to/bare-ffmpeg-mcp/server.js"
    }
  }
}
```

**Important:** Make sure to replace:

- `/path/to/your/bare-ffmpeg-mcp` with the actual path to where you cloned/downloaded this project

3. Save the file and restart Claude Desktop
