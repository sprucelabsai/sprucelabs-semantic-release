const spruceSemanticRelease = require('./build/index')

const config = spruceSemanticRelease.default({
	config: spruceSemanticRelease.ReleaseConfiguration.Package
})

module.exports = config
