---
description: Uploading current project to a specific folder in a GitHub repository
---

This workflow automates the process of pushing the current codebase to a GitHub repository, placing it within a specific project folder.

### Configuration
Ensure that the GitHub MCP server is configured with a valid `GITHUB_PERSONAL_ACCESS_TOKEN`.

### Workflow Steps

// turbo-all
1. **Identify Files**: List all relevant project files, excluding build artifacts and dependencies (`node_modules`, `.next`, `dist`, etc.).
2. **Select Target**: Ask or determine the target repository (e.g., `username/repo`) and the folder name (e.g., `pulse-3d`).
3. **Upload via MCP**: Use the GitHub MCP `push_files` tool to commit these files. 
   - All file paths will be prefixed with the folder name: `folder-name/path/to/file.ts`.
   - Commit message: `Deploy: Syncing [project-name]`

### Usage
To run this workflow, simply ask: "Sync this project to GitHub in folder [folder-name]"
