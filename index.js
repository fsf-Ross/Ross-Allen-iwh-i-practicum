const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.
// * Code for Route 1 goes here
app.get('/', async (req, res) => {
    const map_territories = 'https://api.hubapi.com/crm/v3/objects/2-38694084?properties=status,territory_name,assigned_to';
    const headers = {
        Authorization: `Bearer ${}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(map_territories, { headers });
        const data = resp.data.results;
        console.log('Data:', data);
        res.render('home', { title: 'Map Territories | Custom Object Data', data });      
   } catch (error) {
        console.error(error);
    }
});


// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.
// * Code for Route 2 goes here
app.get('/update-cobj', async (req, res) => {
    try {
        res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });      
   } catch (error) {
        console.error(error);
    }
});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.
// * Code for Route 3 goes here
app.post('/update-cobj', async (req, res) => {
    const updates = {
        properties: {
            "territory_name": req.body.territory_name,
            "status": req.body.status,
            "assigned_to": req.body.assigned_to
        }
    };

    const id = req.query.id;
    const url = 'https://api.hubapi.com/crm/v3/objects/2-38694084';

    const headers = {
        Authorization: `Bearer ${}`,
        'Content-Type': 'application/json'
    }

    try { 
        await axios.post(url, updates, { headers });
        res.redirect('/');
    } catch(err) {
        console.error(err);
        res.status(500).send('Error updating or creating record');
    }
});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));