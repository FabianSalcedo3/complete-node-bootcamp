const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('Hello from the middleware!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const port = 3000;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const getTour = (req, res) => {
  const tour = tours.find((tour) => tour.id == req.params.id);
  if (tour)
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  else
    res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
};

const patchTour = (req, res) => {
  //implement by finding the tour via id and updating from the req.body
};

const deleteTour = (req, res) => {
  //implement by finding the tour via id and splicing it out from the tours
  //and sending back status 204
};

// app.get('/api/v1/tours', getAllTours);

// app.post('/api/v1/tours', createTour);

// app.get('/api/v1/tours/:id', getTour);

// app.patch('/api/v1/tours/:id', patchTour);

// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/tours/:id').get(getTour).patch(patchTour).delete(deleteTour);

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
