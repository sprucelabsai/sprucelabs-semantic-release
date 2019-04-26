module.exports = options => {
	if (!options) {
		options = {}
	}

	const verifyConditions = [
		'@semantic-release/changelog',
		'@semantic-release/github'
	]

	const publish = ['@semantic-release/github']

	if (options.npmPublish === true) {
		publish.unshift('@semantic-release/npm')
		verifyConditions.unshift('@semantic-release/npm')
	}

	return {
		branches: options.branches || ['dev'],
		npmPublish: options.npmPublish === true,
		publishConfig: {
			registry: 'https://registry.npmjs.org/',
			tag: 'beta'
		},
		verifyConditions,
		prepare: [
			{
				path: '@semantic-release/changelog',
				changelogFile: options.changelogFile || 'CHANGELOG.md'
			},
			'@semantic-release/npm',
			'@semantic-release/git'
		],
		publish,
		success: ['@semantic-release/github'],
		fail: ['@semantic-release/github'],
		generateNotes: {
			config: 'conventional-changelog-sprucelabs'
		},
		analyzeCommits: {
			releaseRules: [
				// Custom Rules
				{ type: 'BREAKING', release: 'major' },
				{ type: 'breaking', release: 'major' },
				{ type: 'major', release: 'major' },

				// Angular
				{ type: 'feat', release: 'minor' },
				{ type: 'minor', release: 'minor' },

				// Custom default catch-all, treat it like
				{ type: '/.*/', release: 'patch' }
			]
		}
	}
}
