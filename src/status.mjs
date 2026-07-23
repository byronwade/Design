import { loadManifest } from './manifest.mjs';
import { inspectProjectReadiness, loadProjectConfig, loadProjectLock } from './project.mjs';
import { getResolutionStatus } from './resolve.mjs';

export async function statusContract({ target }) {
  const [manifest, config, lock, generated, readiness] = await Promise.all([
    loadManifest(), loadProjectConfig(target), loadProjectLock(target), getResolutionStatus({ target }), inspectProjectReadiness(target),
  ]);
  const warnings = readiness.filter((item) => item.status === 'warning').length;
  const errors = readiness.filter((item) => item.status === 'error').length;
  return {
    action: 'status',
    target,
    installedVersion: lock.packageVersion,
    availableVersion: manifest.packageVersion,
    updateAvailable: lock.packageVersion !== manifest.packageVersion,
    targets: config.targets,
    adapters: config.adapters ?? lock.adapters ?? [],
    generated,
    readiness: { warnings, errors },
    healthy: generated.current && errors === 0,
  };
}

export async function doctorContract({ target, mode = 'development' }) {
  const status = await statusContract({ target });
  const checks = await inspectProjectReadiness(target);
  checks.unshift({ id: 'compiled-context', status: status.generated.current ? 'pass' : 'error', path: '.design/generated/', message: status.generated.current ? 'Compiled context is current.' : `Compiled context is ${status.generated.state}.`, remediation: status.generated.current ? undefined : 'Run design-contract context for legacy compiled context, then design resolve --request "<task>".' });
  checks.unshift({ id: 'package-version', status: status.updateAvailable ? 'warning' : 'pass', path: '.design/lock.json', message: status.updateAvailable ? `Installed ${status.installedVersion}; available ${status.availableVersion}.` : `Package ${status.installedVersion} is current.`, remediation: status.updateAvailable ? 'Run design-contract sync.' : undefined });
  const strict = mode === 'release';
  const errors = checks.filter((item) => item.status === 'error' || (strict && item.status === 'warning')).length;
  return { action: 'doctor', target, mode, healthy: errors === 0, checks };
}
