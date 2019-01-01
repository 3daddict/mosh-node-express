const Joi = require('joi');
const express = require('express');
const app = express();

//express json middleware
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

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
    const { error } = validateCourse(req.body);
    //validation logic
    if(error) {
        res.status(400).send(error.details[0].message);
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

app.put('/api/courses/:id', (req, res) => {
    //lookup the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given id was not found');

    //validate
    const { error } = validateCourse(req.body);
    //validation logic
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    //update course object
    course.name = req.body.name;
    //return
    res.send(course);

});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}