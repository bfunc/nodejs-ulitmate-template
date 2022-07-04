import { resolve } from 'path'
import { readDirContents } from './src/utils/dependenciesLoader'

export default {
  resolve: {
    /* Automatically register all folders inside /src in order 
    to simulate tsconfig-path behavior for code running in unit tests */
    alias: readDirContents('src').map(dirName => ({
      find: dirName,
      replacement: resolve(__dirname, 'src', dirName),
    })),
  },
}
