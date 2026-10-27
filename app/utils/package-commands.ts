export const packageManagers = ['pnpm', 'yarn', 'npm', 'bun'] as const
export type PackageManager = (typeof packageManagers)[number]

export function packageCommands(code: string) {
  const lines = code.trimEnd().split('\n')
  if (!lines.some((line) => line.trim())) return null
  if (lines.some((line) => line.trim() && !/^\s*pnpm (?:add|install|run)(?:\s|$)/.test(line)))
    return null
  return Object.fromEntries(
    packageManagers.map((manager) => [
      manager,
      lines
        .map((line) =>
          line.replace(
            /^(\s*)pnpm (add|install|run)\b/,
            (_, space, command) =>
              `${space}${manager} ${manager === 'npm' && command === 'add' ? 'install' : command}`,
          ),
        )
        .join('\n'),
    ]),
  ) as Record<PackageManager, string>
}
