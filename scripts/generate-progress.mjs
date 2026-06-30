import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { join, resolve, basename, relative } from 'node:path';

const WORKSPACE_DIR = resolve('.');
const SRC_DIR = join(WORKSPACE_DIR, 'src');
const OUTPUT_FILE = join(WORKSPACE_DIR, 'PROGRESS.md');

// Helper to recursively list files in directory
function getFilesRecursive(dir) {
  let results = [];
  if (!existsSync(dir)) return results;

  const list = readdirSync(dir);
  for (const file of list) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat && stat.isDirectory()) {
      // Exclude standard ignore dirs
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        results = results.concat(getFilesRecursive(filePath));
      }
    } else {
      // Track source files
      if (/\.(ts|tsx|css|js|mjs|json)$/.test(file)) {
        results.push(filePath);
      }
    }
  }
  return results;
}

// Map files to categories based on path
function getCategory(relPath) {
  if (relPath.startsWith('src/app/api')) return 'API Routes';
  if (relPath.startsWith('src/app')) return 'Pages & Routes';
  if (relPath.startsWith('src/components/ui')) return 'UI System (Core)';
  if (relPath.startsWith('src/components/layout')) return 'Layout & Navigation';
  if (relPath.startsWith('src/components/home')) return 'Homepage Sections';
  if (relPath.startsWith('src/components/forms')) return 'Form Components';
  if (relPath.startsWith('src/components/services')) return 'Service Components';
  if (relPath.startsWith('src/redux')) return 'State Management (Redux)';
  if (relPath.startsWith('src/services')) return 'API Services';
  if (relPath.startsWith('src/lib') || relPath.startsWith('src/hooks') || relPath.startsWith('src/constants')) return 'Utilities & Hooks';
  if (relPath.startsWith('src/__tests__')) return 'Test Suites';
  return 'Other Assets';
}

function parseFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const loc = lines.length;
  const relPath = relative(WORKSPACE_DIR, filePath);

  let status = 'completed'; // default
  let todos = [];

  // Parse first 25 lines for explicit status comments
  const scanLimit = Math.min(lines.length, 25);
  let hasExplicitStatus = false;

  for (let i = 0; i < scanLimit; i++) {
    const line = lines[i];
    const statusMatch = line.match(/(?:@status|status:)\s*(completed|in-progress|todo|pending)/i);
    if (statusMatch) {
      const matched = statusMatch[1].toLowerCase();
      status = matched === 'pending' ? 'todo' : matched;
      hasExplicitStatus = true;
      break;
    }
  }

  // Scan all lines for TODO or FIXME comments
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const todoMatch = line.match(/(?:\/\/|\/\*|#)\s*(TODO|FIXME):\s*(.+)$/i);
    if (todoMatch) {
      todos.push({
        line: i + 1,
        text: todoMatch[2].trim(),
      });
    }
  }

  // Fallback status logic if no explicit status is defined
  if (!hasExplicitStatus) {
    if (todos.length > 0) {
      status = 'in-progress';
    } else if (loc <= 5 || (loc < 15 && content.trim() === '')) {
      status = 'todo';
    } else {
      status = 'completed';
    }
  }

  return {
    filePath,
    relPath,
    fileName: basename(filePath),
    loc,
    status,
    todos,
  };
}

function generateProgressBar(percent) {
  const size = 15;
  const dots = Math.round((percent / 100) * size);
  const empty = size - dots;
  return '█'.repeat(dots) + '░'.repeat(empty);
}

function main() {
  console.log('Scanning codebase for progress tracking...');
  const files = getFilesRecursive(SRC_DIR);
  const parsedFiles = files.map(parseFile);

  // Group files by category
  const categories = {};
  let totalCompleted = 0;
  let totalInProgress = 0;
  let totalTodo = 0;
  let totalLoc = 0;

  for (const fileInfo of parsedFiles) {
    const cat = getCategory(fileInfo.relPath);
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(fileInfo);

    totalLoc += fileInfo.loc;
    if (fileInfo.status === 'completed') totalCompleted++;
    else if (fileInfo.status === 'in-progress') totalInProgress++;
    else if (fileInfo.status === 'todo') totalTodo++;
  }

  const totalFiles = parsedFiles.length;
  const progressPercent = totalFiles > 0 ? Math.round((totalCompleted / totalFiles) * 100) : 0;
  const progressBar = generateProgressBar(progressPercent);

  // Prepare Markdown Content
  let md = `# Utility Choice - Implementation Progress Dashboard\n\n`;
  md += `This dashboard is generated automatically by running \`npm run progress\`. It tracks the completion status of all files in the project.\n\n`;

  // Stats Card
  md += `## Overall Progress: ${progressPercent}%\n`;
  md += `\`\`\`text\n`;
  md += `Progress: [${progressBar}] ${progressPercent}%\n\n`;
  md += `Total Files Tracked : ${totalFiles}\n`;
  md += `Completed Files     : ${totalCompleted} (🟢)\n`;
  md += `In-Progress Files   : ${totalInProgress} (🟡)\n`;
  md += `Todo/Pending Files  : ${totalTodo} (🔴)\n`;
  md += `Total Lines of Code : ${totalLoc.toLocaleString()} LOC\n`;
  md += `\`\`\`\n\n`;

  md += `*   🟢 **Completed**: Fully implemented, styled, and validated.\n`;
  md += `*   🟡 **In-Progress**: Partially implemented, undergoing tweaks or contains active \`TODO\` statements.\n`;
  md += `*   🔴 **Todo**: Placed template or skeleton, needs implementation.\n\n`;

  md += `---\n\n`;
  md += `## Detailed Module Breakdown\n\n`;

  // Sort categories logically
  const catOrder = [
    'Pages & Routes',
    'UI System (Core)',
    'Layout & Navigation',
    'Homepage Sections',
    'Form Components',
    'Service Components',
    'State Management (Redux)',
    'API Services',
    'API Routes',
    'Utilities & Hooks',
    'Test Suites',
    'Other Assets',
  ];

  for (const cat of catOrder) {
    if (!categories[cat] || categories[cat].length === 0) continue;

    const list = categories[cat];
    const catCompleted = list.filter((f) => f.status === 'completed').length;
    const catPercent = Math.round((catCompleted / list.length) * 100);

    md += `### ${cat} (${catPercent}% Completed)\n\n`;
    md += `| Status | File | Lines | Active Tasks (TODOs) |\n`;
    md += `| :---: | :--- | :---: | :--- |\n`;

    for (const f of list) {
      let statusEmoji = '🔴';
      let checkMark = '[ ]';
      if (f.status === 'completed') {
        statusEmoji = '🟢';
        checkMark = '[x]';
      } else if (f.status === 'in-progress') {
        statusEmoji = '🟡';
        checkMark = '[/]';
      }

      const fileLink = `[${f.fileName}](file://${f.filePath})`;
      
      let todoList = '';
      if (f.todos.length > 0) {
        todoList = f.todos.map((t) => `Line ${t.line}: ${t.text}`).join('<br>');
      } else {
        todoList = '_None_';
      }

      md += `| ${statusEmoji} | ${checkMark} ${fileLink} | ${f.loc} | ${todoList} |\n`;
    }
    md += `\n`;
  }

  md += `\n---\n_Last Updated: ${new Date().toLocaleString()}_\n`;

  writeFileSync(OUTPUT_FILE, md, 'utf-8');
  console.log(`Successfully generated progress dashboard at: ${OUTPUT_FILE}`);
}

main();
