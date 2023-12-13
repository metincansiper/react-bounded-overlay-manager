export function helloAnything(thing: string): string {
    return `Hello ${thing}!`
}

export { Button } from './src/components/Button'

import { Button as OtherButton } from './src/components/Other/Button'

export { OtherButton }