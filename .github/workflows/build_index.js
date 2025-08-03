import { Octokit } from '@octokit/core';
import lunr from 'lunr';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// A helper to make __dirname available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: GITHUB_TOKEN });

const REPO_OWNER = 'akingdom';
const REPO_NAME = 'akingdom.github.io';

const documents = [];

async function fetchRepositories() {
    console.log('Fetching repositories for akingdom...');
    const response = await octokit.request('GET /users/{owner}/repos', {
        owner: REPO_OWNER,
        type: 'all',
    });
    for (const repo of response.data) {
        if (!repo.fork && !repo.archived && !repo.disabled) {
            documents.push({
                id: repo.full_name,
                title: repo.name,
                text: repo.description || '',
                url: repo.html_url,
                type: 'repository',
            });
        }
    }
}

async function fetchGists() {
    console.log('Fetching gists for akingdom...');
    const response = await octokit.request('GET /users/{owner}/gists', {
        owner: REPO_OWNER,
    });
    for (const gist of response.data) {
        documents.push({
            id: gist.id,
            title: Object.keys(gist.files)[0],
            text: gist.description || '',
            url: gist.html_url,
            type: 'gist',
        });
    }
}

async function fetchWebsiteContent() {
    console.log('Fetching local website content...');
    try {
        const readmePath = path.join(__dirname, '../../README.md');
        const readmeContent = await fs.readFile(readmePath, 'utf8');

        documents.push({
            id: 'readme',
            title: 'README',
            text: readmeContent,
            url: '/',
            type: 'page',
        });
    } catch (error) {
        console.error('Failed to read README.md:', error.message);
    }
}

async function buildAndSaveIndex() {
    console.log(`Found ${documents.length} documents to index.`);
    const index = lunr(function () {
        this.ref('id');
        this.field('title');
        this.field('text');
        this.field('type');

        documents.forEach(doc => {
            this.add(doc);
        });
    });

    const output = {
        index: index.toJSON(),
        documents: documents.map(doc => ({
            id: doc.id,
            title: doc.title,
            url: doc.url
        }))
    };

    const outputPath = path.join(__dirname, '../../assets/search_index.json');
    await fs.writeFile(outputPath, JSON.stringify(output), 'utf8');
    console.log('Search index successfully built and saved!');
}

async function run() {
    try {
        await fetchRepositories();
        await fetchGists();
        await fetchWebsiteContent();
        await buildAndSaveIndex();
    } catch (error) {
        console.error('An error occurred during indexing:', error);
        process.exit(1);
    }
}

run();
