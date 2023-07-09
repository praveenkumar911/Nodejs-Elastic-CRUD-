const express = require('express');
const elasticsearch = require('elasticsearch');

const app = express();
app.use(express.json());

// Create an Elasticsearch client
const client = new elasticsearch.Client({
  host: 'https://10.2.135.120:9200/',
  httpAuth: 'elastic:mkD=kv-Spl-f+EZaZ7u-' // Replace with your Elasticsearch username and password
});

// Create a route to create a new document
app.post('/', async (req, res) => {
  const { name, age } = req.body;

  // Create a new document in Elasticsearch
  const doc = {
    name,
    age
  };

  await client.index({
    index: 'my-index',
    body: doc
  });    

  res.status(201).send('Document created');
});

// Create a route to get all documents
app.get('/', async (req, res) => {
  // Get all documents from Elasticsearch
  const results = await client.search({
    index: 'my-index'
  });

  res.json(results.hits.hits);
});

// Create a route to update a document
app.put('/:id', async (req, res) => {
  const { id, name, age } = req.body;

  // Update the document in Elasticsearch
  await client.update({
    index: 'my-index',
    id,
    body: {
      doc: {
        name,
        age
      }
    }
  });

  res.status(200).send('Document updated');
});

// Create a route to delete a document
app.delete('/:id', async (req, res) => {
  const { id } = req.body;

  // Delete the document from Elasticsearch
  await client.delete({
    index: 'my-index',
    id
  });

  res.status(200).send('Document deleted');
});

app.listen(3000, () => { 
  console.log('CRUD API listening on port 3000');
});
