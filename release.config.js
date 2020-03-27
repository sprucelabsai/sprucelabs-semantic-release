const spruceSemanticRelease = require('./build/index').default

const config = spruceSemanticRelease({
	npmPublish: true,
	branches: [
		{ name: 'dev', channel: 'beta' },
		{ name: 'canary', prerelease: true },
		{ name: 'prerelease/*', prerelease: true }
	],
	releaseMessage:
		'chore(release): ${nextRelease.version} [skip-ci-version]\n\n${nextRelease.notes}'
})

module.exports = config
