#!/usr/bin/env node

const {
  REQUIRED_SECTIONS,
  WINDOWED_SECTIONS,
  extractField,
  findDuplicateSections,
  findDuplicateTaskIds,
  findMissingSections,
  hasField,
  parseTaskBlocks,
  readPlanProgress,
} = require('./lib/plan-progress.cjs');

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function main() {
  const fileArg = process.argv[2];

  if (!fileArg) {
    console.error('usage: validate-plan-progress.cjs <plan-progress.md>');
    process.exit(1);
  }
  const { filePath, markdown, yaml, headings, tasks } = readPlanProgress(fileArg);

  if (!yaml) {
    fail('missing Machine Record YAML block');
  }

  for (const section of findMissingSections(headings, REQUIRED_SECTIONS)) {
    fail(`missing section: ## ${section}`);
  }

  for (const section of findDuplicateSections(headings, REQUIRED_SECTIONS)) {
    fail(`duplicate section: ## ${section}`);
  }

  const requiredMeta = [
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
    'writer',
  ];

  for (const field of requiredMeta) {
    if (!hasField(yaml, field)) {
      fail(`missing meta field: ${field}`);
    }
  }

  const requiredTaskFields = [
    'id',
    'name',
    'depends_on',
    'duration_pert',
    'effort_pert',
    'status',
    'owner',
    'write_set',
    'acceptance',
    'verification',
    'artifacts',
    'review_state',
    'blocker_ids',
  ];

  const taskBlocks = parseTaskBlocks(yaml);
  const taskCount = taskBlocks.length;
  if (taskCount === 0) {
    fail('no task nodes found');
  }

  taskBlocks.forEach((block, index) => {
    for (const field of requiredTaskFields) {
      if (!hasField(block, field)) {
        fail(`task ${index + 1} missing field: ${field}`);
      }
    }
  });

  const duplicateTaskIds = findDuplicateTaskIds(tasks);
  if (duplicateTaskIds.length > 0) {
    fail(`duplicate task id(s): ${duplicateTaskIds.join(', ')}`);
  }

  const planningMode = extractField(yaml, 'planning_mode');
  if (planningMode === 'windowed') {
    const featureMeta = [
      'contract_ref',
      'current_window_id',
      'window_status',
    ];

    for (const field of featureMeta) {
      if (!hasField(yaml, field)) {
        fail(`missing windowed meta field: ${field}`);
      }
    }

    for (const section of findMissingSections(headings, WINDOWED_SECTIONS)) {
      fail(`missing windowed section: ## ${section}`);
    }
  }

  if (process.exitCode) {
    process.exit(process.exitCode);
  }

  console.log(`valid plan-progress: ${filePath}`);
  console.log(`planning_mode: ${planningMode}`);
  console.log(`task_count: ${taskCount}`);
}

main();
