import { readdirSync } from 'fs'
import { resolve } from 'path'
import { capitalize } from 'utils/utils'
const fileExtensions = '.ts'
const getFilename = (filename: string) => filename + fileExtensions

const readDirContents = (root: string) =>
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
  const module = await import(getFilename(filename))
  return module.default
}

export const loadDependencies = async ({
  root,
  filenames,
}: {
  root: string
  filenames: string[]
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
              const module = await loadModule(path)
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
      acc[capitalize(cur.name) + capitalize(cur.file)] = cur.module
      return acc
    }, {} as Record<string, object>)

  return dependenciesMap
}
