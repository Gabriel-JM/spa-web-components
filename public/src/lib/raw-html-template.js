const regExp = /<([a-zA-Z0-9\-]+)\s(.*)\/>/g

export class RawHTML {
  constructor(html) {
    this.isSafe = true
    this.html = html
  }
}

export function raw(strings, values) {
  const fullHtml = strings.reduce((acc, str, index) => {
    return acc + str + (values ? values[index] : "");
  }, "")

  const parsedHtml = fullHtml
    .replace(
      regExp,
      (_fullResult, name, attrs) => {
        if(!name.includes('-')) return _fullResult

        const attributes = attrs.trim() ? ` ${attrs.trim()}` : ""

        return `<${name}${attributes}></${name}>`
      }
    )
    .replace(
      /<(slot)(.*?)\/>/g,
      '<$1$2></$1>'
    )

  return new RawHTML(parsedHtml)
}
