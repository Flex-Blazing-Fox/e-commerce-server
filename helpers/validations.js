function isTypeUnique(err) {
  if (err.name === 'SequelizeUniqueConstraintError') {
    return { name: 'UniqueTypeError' }
  }
}

function isProductUnique(err) {
  if (err.name === 'SequelizeUniqueConstraintError') {
    return { name: 'UniqueProductError' }
  }
}

module.exports = { 
  isTypeUnique,
  isProductUnique
}