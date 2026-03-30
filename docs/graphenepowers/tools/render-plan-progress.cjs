#!/usr/bin/env node

const { readPlanProgress } = require('./lib/plan-progress.cjs');

function formatList(items) {
  if (!items || items.length === 0) return 'none';
  return items.join(', ');
}

function formatReadyParallelLanes(value) {
  if (!value) return 'unknown';
  if (Array.isArray(value)) {
    if (value.length === 0) return 'none';
    return value
      .map(lane => Array.isArray(lane) ? lane.join(' + ') : lane)
      .join('; ');
  }
  return value.replace(/\s+/g, ' ');
}

function main() {
  const fileArg = process.argv[2];
  if (!fileArg) {
    console.error('usage: render-plan-progress.cjs <plan-progress.md>');
    process.exit(1);
  }

  const { yaml, meta, tasks } = readPlanProgress(fileArg);

  if (!yaml) {
    console.error('missing Machine Record YAML block');
    process.exit(1);
  }
  const byStatus = new Map();

  for (const task of tasks) {
    const current = byStatus.get(task.status) || [];
    current.push(task);
    byStatus.set(task.status, current);
  }

  console.log('Graph Summary');
  console.log(`- grade: ${meta.grade || 'unknown'}`);
  console.log(`- planning mode: ${meta.planning_mode || 'unknown'}`);
  console.log(`- graph version: ${meta.graph_version || 'unknown'}`);
  console.log(`- critical path: ${Array.isArray(meta.critical_path) ? meta.critical_path.join(' -> ') : meta.critical_path || 'unknown'}`);
  console.log(`- ready parallel lanes: ${formatReadyParallelLanes(meta.ready_parallel_lanes)}`);
  console.log(`- current window: ${meta.current_window_id || 'n/a'}`);
  console.log(`- window status: ${meta.window_status || 'n/a'}`);
  console.log('');

  console.log('Kanban');
  for (const status of ['backlog', 'ready', 'in_progress', 'blocked', 'review', 'done', 'superseded']) {
    const items = byStatus.get(status) || [];
    const label = status.replace('_', ' ');
    console.log(`- ${label}: ${items.length ? items.map(task => `${task.id} ${task.name}`).join('; ') : 'none'}`);
  }
  console.log('');

  const reviewQueue = tasks.filter(task => task.status === 'review' || task.review_state === 'pending');
  console.log('Review Queue');
  console.log(`- ${formatList(reviewQueue.map(task => `${task.id} ${task.name}`))}`);
}

main();
