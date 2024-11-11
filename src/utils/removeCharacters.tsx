export const removeCharacters = (str: string, charactersToRemove: string[]) =>
  charactersToRemove.reduce(
    (acc, currentChar) => acc.split(currentChar).join(''),
    str,
  )
