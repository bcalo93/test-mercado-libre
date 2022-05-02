export default function authorMiddleware(req, res, next) {
  res.json({
    ...res.body,
    author: {
      name: 'Brahian',
      lastname: 'Calo',
    },
  })

  next()
}
