const regExp = /<([a-zA-Z0-9\-]+)\s(.*)\/>/g

export function html(strings, ...values) {
  values = values.map((value) => {
    return value.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  })

  const fullHtml = strings.reduce((acc, str, index) => {
    return acc + str + (values[index] || "");
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

  return parsedHtml
}
