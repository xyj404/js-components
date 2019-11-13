const fs = require('fs')
const prettierJson = fs.readFileSync(require.resolve('@fe/fabric/.prettierrc'), 'utf-8')
const prettier = JSON.parse(prettierJson)

module.exports = prettier
