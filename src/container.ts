import {
  createContainer,
  InjectionMode,
  asFunction,
  FunctionReturning,
} from 'awilix'

/** Returns Awilix container instance. */
/* eslint-disable */
export default function createAppContainer(dependencies: any) {
  const containerDependencies = Object.fromEntries(
    Object.entries(dependencies).map(([name, func]) => [
      name,
      asFunction(func as FunctionReturning<unknown>).singleton(),
    ])
  )

  return createContainer({
    injectionMode: InjectionMode.PROXY,
  }).register(containerDependencies)
}
