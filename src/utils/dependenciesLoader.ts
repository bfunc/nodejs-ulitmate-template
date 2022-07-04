import { readdirSync } from 'fs'
import { resolve } from 'path'

export const readDirContents = (root: string) =>
  readdirSync(root, { withFileTypes: true })
    .filter(dirent => {
      if (dirent.isDirectory()) {
        const hasRoutes = readdirSync(resolve(root, dirent.name), {
          withFileTypes: true,
        })
        return hasRoutes
      }
      return false
    })
    .map(dirent => dirent.name)

export const loadModule = async (filename: string) => {
  const module = await import(filename)
  return module.default
}

export const loadDependencies = async ({
  root,
  filenames,
  extension,
  getDependencyName,
}: {
  root: string
  extension: string
  filenames: string[]
  getDependencyName: (_: { name: string; file: string }) => string
}) => {
  // Read directory names in specified dir, example: [feature1, feature2] from /modules

  const modulesContent = readDirContents(root)

  // Dynamically import modules with provided filenames from found folders
  const dependencies = await Promise.all(
    modulesContent.map(
      async dirname =>
        await Promise.all(
          filenames.map(async file => {
            const path = resolve(root, dirname, file)
            try {
              const module = await loadModule(`${path}.${extension}`)
              return { name: dirname, file, module }
            } catch {
              return undefined
            }
          })
        )
    )
  )

  // Map dependencies to key/value form
  const dependenciesMap = dependencies
    .flatMap(module => module)
    .filter(module => !!module)
    .reduce((acc, cur) => {
      if (!cur) return acc
      acc[getDependencyName(cur)] = cur.module
      return acc
    }, {} as Record<string, object>)

  return dependenciesMap
}
