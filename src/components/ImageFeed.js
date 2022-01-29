import React, { useState, useCallback} from "react";
import { Container, Card, Button, Placeholder, Spinner } from "react-bootstrap";

import "./ImageFeed.css"
import { useAPI } from "../contexts/ApiContext";

export default function ImageFeed() {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const { post, loading, numberOfDays } = useAPI();

  var tempPost = new Array(numberOfDays).fill(0);
  
  function handleLike(data) {
    if (data.isliked) {
      data.isliked = false;
    } else {
      data.isliked = true;
    }
    forceUpdate();
  }

  if (loading) {
    return (
      <Container fluid className="PostContainer">
        <>
          {tempPost.map(() => (
            <Card className="TempCard">
            <Card.Img variant="top" />
            <Card.Body>
              <div className="ImagePlaceHolder">
                <Spinner animation="border" size="lg" />
              </div>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder className="PlaceHolderOne" size="lg" />{" "}
                <Placeholder className="PlaceHolderTwo" size="lg" />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder className="PlaceHolderThree" />
                <Placeholder className="PlaceHolderThree" />
                <Placeholder className="PlaceHolderThree" />
                <Placeholder className="PlaceHolderFour" />{" "}
                <Placeholder className="PlaceHolderFive" />
              </Placeholder>
              <Button className="ButtonPlaceHoder" disabled>
                <Spinner animation="border" size="sm" />
              </Button>
            </Card.Body>
          </Card>
          ))}
        </>
      </Container>
    );
  }

  if (!loading) {
    return (
      <Container fluid className="PostContainer">
        <>
          {post.map((data, id) => (
            <Card
              className="Card"
              key={id}
            >
              {data.media_type == "video" ? (
                <Card.Img variant="top" src={data.thumbnail_url} />
              ) : (
                <Card.Img variant="top" src={data.url} />
              )}
              <Card.Body>
                <Card.Title>
                  {data.title} - {data.date}
                </Card.Title>
                <Card.Text>{data.explanation}</Card.Text>
                {data.copyright == null ? (
                  <Card.Text>Credit: N/A</Card.Text>
                ) : (
                  <Card.Text>Credit: {data.copyright}</Card.Text>
                )}
                <Button disabled={loading} onClick={() => handleLike(data, id)}>
                  {data.isliked == true ? "Unlike" : "Like"}
                </Button>
              </Card.Body>
            </Card>
          ))}
        </>
      </Container>
    );
  }
}