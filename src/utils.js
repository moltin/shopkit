import { action } from 'easy-peasy'

export const normalizeAttributes = target =>
  [...target.attributes].reduce((attributes, a) => {
    const startsWith = 'data-moltin-'

    if (!a.name.startsWith(startsWith)) return false

    return {
      ...attributes,
      [a.name.replace(startsWith, '')]: a.value
    }
  }, {})

export const changeRoute = route =>
  action(state => {
    state.route = route
    state.open = true
  })

export const pluralize = (count, noun, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`
