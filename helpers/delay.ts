export async function delay() {
  const ms = 1000
  return await new Promise((resolve) => setTimeout(resolve, ms))
}
