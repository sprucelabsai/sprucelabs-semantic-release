module.exports = options => {
	if (!options) {
		options = {}
	}

	const verifyConditions = [
		'@semantic-release/changelog',
		'@semantic-release/github'
	]

	const publish = ['@semantic-release/github']

	const prepare = [
		{
			path: '@semantic-release/changelog',
			changelogFile: options.changelogFile || 'CHANGELOG.md'
		}
	]

	const plugins = [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator'
	]

	if (options.npmPublish === true) {
		publish.unshift('@semantic-release/npm')
		verifyConditions.unshift('@semantic-release/npm')
		prepare.push('@semantic-release/npm')
		plugins.push('@semantic-release/npm')
	}

	prepare.push('@semantic-release/git')
	plugins.push('@semantic-release/github')

	return {
		branches: options.branches || [
			{ name: 'master', prerelease: true },
			{ name: 'alpha', prerelease: true },
			'qa',
			{ name: 'dev', prerelease: true }
		],
		npmPublish: options.npmPublish === true,
		plugins,
		publishConfig: {
			registry: 'https://registry.npmjs.org/',
			tag: 'beta'
		},
		verifyConditions,
		prepare,
		publish,
		success: ['@semantic-release/github'],
		fail: ['@semantic-release/github'],
		generateNotes: {
			config: 'conventional-changelog-sprucelabs'
		},
		analyzeCommits: {
			config: 'conventional-changelog-sprucelabs',
			releaseRules: [
				// Custom Rules
				{ type: 'BREAKING', release: 'major' },
				{ type: 'breaking', release: 'major' },
				{ type: 'major', release: 'major' },

				// Angular
				{ type: 'feat', release: 'minor' },
				{ type: 'minor', release: 'minor' },

				// Custom default catch-all, treat it like
				{ release: 'patch' }
			]
		}
	}
}
