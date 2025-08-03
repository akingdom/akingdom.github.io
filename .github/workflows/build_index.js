const { Octokit } = require('@octokit/core');
const lunr = require('lunr');
const fs = require('fs').promises;
const path = require('path');

const USERNAME = 'akingdom';
const REPOSITORY_NAME = 'akingdom.github.io';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // The token from the GitHub Action

const octokit = new Octokit({ auth: GITHUB_TOKEN });

// Fetches all public repositories and their READMEs
async function fetchRepositories() {
    console.log(`Fetching repositories for ${USERNAME}...`);
    const { data: repos } = await octokit.request('GET /users/{username}/repos', {
        username: USERNAME,
        type: 'public',
    });

    const documents = await Promise.all(
        repos.map(async (repo) => {
            let readmeContent = '';
            try {
                // Fetch the README content for each repo
                const { data: readme } = await octokit.request('GET /repos/{owner}/{repo}/readme', {
                    owner: USERNAME,
                    repo: repo.name,
                    mediaType: { format: 'html' },
                });
                readmeContent = readme;
            } catch (error) {
                // Ignore repos without a README
                if (error.status !== 404) {
                    console.error(`Failed to fetch README for ${repo.name}:`, error.message);
                }
            }

            return {
                id: repo.full_name,
                title: repo.name,
                url: repo.html_url,
                type: 'repository',
                content: `${repo.description || ''} ${readmeContent}`,
            };
        })
    );
    return documents;
}

// Fetches all public gists
async function fetchGists() {
    console.log(`Fetching gists for ${USERNAME}...`);
    const { data: gists } = await octokit.request('GET /users/{username}/gists', {
        username: USERNAME,
    });

    return gists.map((gist) => {
        const fileContent = Object.values(gist.files)
            .map((file) => file.content || '')
            .join(' ');
        const description = gist.description || 'No description';

        return {
            id: gist.id,
            title: description,
            url: gist.html_url,
            type: 'gist',
            content: `${description} ${fileContent}`,
        };
    });
}

// Reads the local README.md file
async function fetchWebsiteContent() {
    console.log('Fetching local website content...');
    const content = await fs.readFile(path.join(__dirname, '../../README.md'), 'utf-8');
    return [{
        id: 'website',
        title: 'Andrew Kingdom - Website',
        url: 'https://akingdom.github.io',
        type: 'website',
        content: content,
    }];
}

async function buildAndSaveIndex() {
    try {
        const repositories = await fetchRepositories();
        const gists = await fetchGists();
        const websiteContent = await fetchWebsiteContent();

        // Combine all documents into a single array
        const documents = [...repositories, ...gists, ...websiteContent];
        console.log(`Found ${documents.length} documents to index.`);

        // Build the Lunr index
        const idx = lunr(function () {
            this.ref('id');
            this.field('title', { boost: 10 });
            this.field('content');
            this.field('type');

            documents.forEach((doc) => {
                this.add(doc);
            });
        });

        // Save the index and the documents
        const indexData = {
            index: idx.toJSON(),
            docs: documents,
        };

        const outputDir = path.join(__dirname, '../../assets');
        await fs.mkdir(outputDir, { recursive: true });
        await fs.writeFile(path.join(outputDir, 'search_index.json'), JSON.stringify(indexData));

        console.log('Search index successfully built and saved!');
    } catch (error) {
        console.error('An error occurred during indexing:', error);
        process.exit(1);
    }
}

buildAndSaveIndex();
