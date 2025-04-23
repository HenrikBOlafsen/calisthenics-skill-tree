const images = import.meta.glob('../assets/move_images/*.{jpg,jpeg,png,gif,svg}', {
  eager: true,
  import: 'default',
})

export const imageOptions = Object.entries(images).map(([path, url]) => {
  const name = path.split('/').pop()!.split('.')[0] // extract just the filename (no extension)
  return { name, url: url as string }
})
