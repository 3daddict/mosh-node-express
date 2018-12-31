const Joi = require('joi');
const express = require('express');
const app = express();

//express json middleware
app.use(express.json());

const courses = [
{
    id: 1,
    name: "course 1",
},
{
    id: 2,
    name: "course 2",
},
{
    id: 3,
    name: "course 3",
},
];

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given id was not found');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    //schema
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    //validation logic
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //create a new course object
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    //push to courses array
    courses.push(course);
    //return object to client
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});