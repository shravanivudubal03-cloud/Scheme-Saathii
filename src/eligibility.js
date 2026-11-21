import { schemes } from '../data/schemes.js';

// Eligibility authority: a scheme's explicit rule function. Models never select schemes.
export function matchSchemes(facts) {
  return schemes.filter(scheme => scheme.rule(facts));
}

function criterionState(criterion, facts) {
  const value = facts[criterion.key];
  if (criterion.key === 'incomePath') {
    if (facts.bpl === true) return 'pass';
    if (Number.isFinite(facts.annualIncome) && facts.annualIncome <= 21000) return 'pass';
    if (facts.bpl === false && Number.isFinite(facts.annualIncome) && facts.annualIncome > 21000) return 'fail';
    return 'unknown';
  }
  if (value === null || value === undefined || value === '') return 'unknown';
  if (criterion.operator === 'range') return value >= criterion.min && value <= criterion.max ? 'pass' : 'fail';
  if (criterion.operator === 'min') return value >= criterion.min ? 'pass' : 'fail';
  if (criterion.operator === 'max') return value <= criterion.max ? 'pass' : 'fail';
  return value === criterion.value ? 'pass' : 'fail';
}

export function evaluateScheme(scheme, facts) {
  const checks = scheme.criteria.map(criterion => ({ criterion, state: criterionState(criterion, facts) }));
  const failed = checks.filter(check => check.state === 'fail');
  const missing = checks.filter(check => check.state === 'unknown');
  if (failed.length) return { scheme, status: 'not-eligible', missing: [], checks };
  if (missing.length) return { scheme, status: 'needs-info', missing: missing.map(check => check.criterion.key), checks };
  if (!scheme.rule(facts)) return { scheme, status: 'not-eligible', missing: [], checks };
  return { scheme, status: 'eligible', missing: [], checks };
}

export function evaluateCatalog(facts) {
  return schemes.map(scheme => evaluateScheme(scheme, facts));
}

export const factFields = [
  'state', 'age', 'applicantWoman', 'lpgConnection', 'poorHousehold', 'farmer', 'landOwned', 'annualIncome', 'bpl', 'supportNeed',
  'hasGirlChild', 'girlBornAfter2023', 'rationCardEligible', 'incomeTaxPayer',
  'governmentEmployee', 'otherPmKisanExclusion'
];
