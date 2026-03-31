const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const { readPlanProgress } = require('./lib/plan-progress.cjs');

const repoRoot = path.resolve(__dirname, '..', '..', '..');
const docsRoot = path.join(repoRoot, 'docs', 'graphenepowers');
const examplesRoot = path.join(docsRoot, 'examples');
const fixturesRoot = path.join(__dirname, 'test-fixtures');
const validateScript = path.join(__dirname, 'validate-plan-progress.cjs');
const renderScript = path.join(__dirname, 'render-plan-progress.cjs');

function runNode(scriptPath, filePath) {
  return spawnSync(process.execPath, [scriptPath, filePath], {
    cwd: repoRoot,
    encoding: 'utf8',
  });
}

test('validate-plan-progress accepts the feature example', () => {
  const filePath = path.join(examplesRoot, 'feature-windowed', 'plan-progress.md');
  const result = runNode(validateScript, filePath);

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /planning_mode: windowed/);
});

test('validate-plan-progress accepts the small-task example', () => {
  const filePath = path.join(examplesRoot, 'small-task-lightweight', 'plan-progress.md');
  const result = runNode(validateScript, filePath);

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /planning_mode: lightweight/);
});

test('validate-plan-progress rejects duplicate task ids', () => {
  const filePath = path.join(fixturesRoot, 'invalid-duplicate-task-ids.md');
  const result = runNode(validateScript, filePath);

  assert.notEqual(result.status, 0, result.stdout);
  assert.match(result.stderr || result.stdout, /duplicate task id/i);
});

test('validate-plan-progress rejects a missing blockers section', () => {
  const filePath = path.join(fixturesRoot, 'invalid-missing-blockers-section.md');
  const result = runNode(validateScript, filePath);

  assert.notEqual(result.status, 0, result.stdout);
  assert.match(result.stderr || result.stdout, /Human View Blockers/);
});

test('render-plan-progress prints the review queue from the feature example', () => {
  const filePath = path.join(examplesRoot, 'feature-windowed', 'plan-progress.md');
  const result = runNode(renderScript, filePath);

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Review Queue/);
  assert.match(result.stdout, /T3 Implement parser core/);
});

test('readPlanProgress preserves multiline task metadata', () => {
  const filePath = path.join(examplesRoot, 'feature-windowed', 'plan-progress.md');
  const { tasks } = readPlanProgress(filePath);
  const parserTask = tasks.find((task) => task.id === 'T3');

  assert.deepEqual(parserTask.acceptance, [
    'parser accepts locked v2 payloads',
    'parser errors remain typed',
  ]);
  assert.deepEqual(parserTask.verification_commands, [
    'npm test -- widget/parser --runInBand',
  ]);
  assert.deepEqual(parserTask.write_set, [
    'src/widget/parser.ts',
    'tests/widget/parser.test.ts',
  ]);
  assert.deepEqual(parserTask.artifacts, [
    'src/widget/parser.ts',
    'tests/widget/parser.test.ts',
  ]);
});
