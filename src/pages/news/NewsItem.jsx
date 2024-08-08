import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const NewsItem = ({ article }) => {
  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={article.urlToImage}
          alt="card-image"
          className="w-full h-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {article.title}
        </Typography>
        <Typography>
          {article.description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          variant="filled"
          color="blue"
          onClick={() => window.open(article.url, "_blank")}
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsItem;
