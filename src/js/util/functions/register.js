// helper function for registering components in tightly coupled component groups
// eslint-disable-next-line max-len
export default (vue, components) => Object.keys(components).forEach(component => vue.component(component, components[component]))
