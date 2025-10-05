export function jsonLd(data: object) {
  return {
    __html: JSON.stringify(data, null, 2)
  }
}
