const fs = require('fs');
const path = require('path');

const REQUIRED_SECTIONS = [
  'Machine Record',
  'Human View Summary',
  'Human View Graph Summary',
  'Human View Kanban',
  'Human View Blockers',
];

const WINDOWED_SECTIONS = [
  'Human View Current Window',
  'Human View Review Queue',
];

function readPlanProgress(fileArg) {
  const filePath = path.resolve(fileArg);
  const markdown = fs.readFileSync(filePath, 'utf8');
  return {
    filePath,
    markdown,
    ...parsePlanProgressMarkdown(markdown),
  };
}

function parsePlanProgressMarkdown(markdown) {
  const yaml = extractYamlBlock(markdown);

  return {
    yaml,
    headings: collectHeadings(markdown),
    meta: yaml ? parseMeta(yaml) : {},
    tasks: yaml ? parseTasks(yaml) : [],
  };
}

function extractYamlBlock(markdown) {
  const match = markdown.match(/## Machine Record\s+```yaml\r?\n([\s\S]*?)```/);
  return match ? match[1] : null;
}

function collectHeadings(markdown) {
  const headings = new Map();
  const regex = /^##\s+(.+)$/gm;
  let match = regex.exec(markdown);

  while (match) {
    const heading = match[1].trim();
    headings.set(heading, (headings.get(heading) || 0) + 1);
    match = regex.exec(markdown);
  }

  return headings;
}

function findMissingSections(headings, expected) {
  return expected.filter(section => !headings.has(section));
}

function findDuplicateSections(headings, expected) {
  return expected.filter(section => (headings.get(section) || 0) > 1);
}

function parseTasks(yaml) {
  const taskBlocks = parseTaskBlocks(yaml);

  return taskBlocks.map(block => ({
    id: extractField(block, 'id'),
    name: extractField(block, 'name'),
    depends_on: parseScalar(extractField(block, 'depends_on')),
    duration_pert: parseScalar(extractField(block, 'duration_pert')),
    effort_pert: parseScalar(extractField(block, 'effort_pert')),
    status: extractField(block, 'status'),
    review_state: extractField(block, 'review_state'),
    owner: extractField(block, 'owner'),
    window_id: extractField(block, 'window_id'),
    write_set: parseYamlList(block, 'write_set'),
    acceptance: parseYamlList(block, 'acceptance'),
    artifacts: parseYamlList(block, 'artifacts'),
    blocker_ids: parseYamlList(block, 'blocker_ids'),
    verification_commands: parseNestedYamlList(block, 'verification', 'commands'),
    verification_evidence: parseNestedYamlList(block, 'verification', 'evidence'),
    raw: block,
  }));
}

function parseTaskBlocks(yaml) {
  const tasksSectionMatch = yaml.match(/tasks:\n([\s\S]*?)(?:\nblockers:|\nevents:|\nresult_packets:|$)/);
  if (!tasksSectionMatch) return [];

  return tasksSectionMatch[1]
    .split(/\n(?=\s*-\s+id:)/)
    .map(block => block.trim())
    .filter(Boolean)
    .map(block => block.replace(/^- id:/m, 'id:'));
}

function parseMeta(yaml) {
  const fields = [
    'plan_version',
    'grade',
    'planning_mode',
    'confidence',
    'profile_asymmetry',
    'graph_version',
    'critical_path',
    'ready_parallel_lanes',
    'estimated_duration',
    'estimated_effort',
    'contract_ref',
    'current_window_id',
    'window_status',
    'writer',
  ];

  const meta = {};
  for (const field of fields) {
    meta[field] = parseScalar(extractField(yaml, field));
  }

  return meta;
}

function extractField(text, field) {
  const pattern = new RegExp(`^[ \\t]*${field}:[ \\t]*([^\\r\\n]+)[ \\t]*$`, 'm');
  const match = text.match(pattern);
  return match ? match[1].trim() : null;
}

function hasField(text, field) {
  const pattern = new RegExp(`^[ \\t]*${field}:[ \\t]*(?:[^\\r\\n]*)$`, 'm');
  return pattern.test(text);
}

function parseScalar(value) {
  if (value === null || value === undefined) return null;

  const trimmed = value.trim();
  if (trimmed === 'null') return null;
  if (trimmed === '[]') return [];
  if (trimmed === '{}') return {};

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return parseBracketList(trimmed);
  }

  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    return parseInlineObject(trimmed);
  }

  if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }

  return trimmed.replace(/^["']|["']$/g, '');
}

function parseBracketList(value) {
  const inner = value.slice(1, -1).trim();
  if (!inner) return [];

  const items = [];
  let current = '';
  let depth = 0;

  for (const char of inner) {
    if (char === '[' || char === '{') depth += 1;
    if (char === ']' || char === '}') depth -= 1;

    if (char === ',' && depth === 0) {
      const item = current.trim();
      if (item) items.push(parseScalar(item));
      current = '';
      continue;
    }

    current += char;
  }

  const finalItem = current.trim();
  if (finalItem) items.push(parseScalar(finalItem));

  return items;
}

function parseInlineObject(value) {
  const inner = value.slice(1, -1).trim();
  if (!inner) return {};

  const entries = [];
  let current = '';
  let depth = 0;

  for (const char of inner) {
    if (char === '[' || char === '{') depth += 1;
    if (char === ']' || char === '}') depth -= 1;

    if (char === ',' && depth === 0) {
      entries.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  if (current.trim()) entries.push(current);

  return Object.fromEntries(entries.map(entry => {
    const [rawKey, ...rest] = entry.split(':');
    return [rawKey.trim(), parseScalar(rest.join(':'))];
  }));
}

function findDuplicateTaskIds(tasks) {
  const seen = new Set();
  const duplicates = new Set();

  for (const task of tasks) {
    if (!task.id) continue;
    if (seen.has(task.id)) {
      duplicates.add(task.id);
      continue;
    }
    seen.add(task.id);
  }

  return [...duplicates];
}

function parseYamlList(text, field) {
  const inlineValue = parseScalar(extractField(text, field));
  if (Array.isArray(inlineValue)) {
    return inlineValue;
  }
  if (inlineValue !== null && inlineValue !== undefined) {
    return [inlineValue];
  }

  const lines = text.split(/\r?\n/);
  let captureIndent = null;
  const items = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const fieldMatch = line.match(/^(\s*)([A-Za-z0-9_]+):\s*$/);

    if (captureIndent === null) {
      if (fieldMatch && fieldMatch[2] === field) {
        captureIndent = fieldMatch[1].length;
      }
      continue;
    }

    if (!line.trim()) {
      continue;
    }

    const indent = line.match(/^(\s*)/)?.[1].length ?? 0;
    if (indent <= captureIndent) {
      break;
    }

    const itemMatch = line.match(/^\s*-\s+(.+)$/);
    if (itemMatch) {
      items.push(parseScalar(itemMatch[1]));
    }
  }

  return items;
}

function parseNestedYamlList(text, parentField, childField) {
  const lines = text.split(/\r?\n/);
  let parentIndent = null;
  let childIndent = null;
  const items = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const indent = line.match(/^(\s*)/)?.[1].length ?? 0;
    const fieldMatch = line.match(/^(\s*)([A-Za-z0-9_]+):\s*(.*)$/);

    if (parentIndent === null) {
      if (fieldMatch && fieldMatch[2] === parentField) {
        parentIndent = fieldMatch[1].length;
      }
      continue;
    }

    if (!line.trim()) {
      continue;
    }

    if (indent <= parentIndent) {
      break;
    }

    if (childIndent === null) {
      if (fieldMatch && fieldMatch[2] === childField) {
        const value = fieldMatch[3];
        if (value && value.trim()) {
          const inlineValue = parseScalar(value);
          return Array.isArray(inlineValue) ? inlineValue : [inlineValue];
        }
        childIndent = fieldMatch[1].length;
      }
      continue;
    }

    if (indent <= childIndent) {
      break;
    }

    const itemMatch = line.match(/^\s*-\s+(.+)$/);
    if (itemMatch) {
      items.push(parseScalar(itemMatch[1]));
    }
  }

  return items;
}

module.exports = {
  REQUIRED_SECTIONS,
  WINDOWED_SECTIONS,
  extractField,
  extractYamlBlock,
  findDuplicateSections,
  findDuplicateTaskIds,
  findMissingSections,
  hasField,
  parsePlanProgressMarkdown,
  parseScalar,
  parseTasks,
  parseTaskBlocks,
  parseYamlList,
  parseNestedYamlList,
  parseMeta,
  readPlanProgress,
};
