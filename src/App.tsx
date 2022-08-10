import React, { useState } from "react";
import axios from "axios";
import JokeItem from "./components/JokeItem";
import OwlImage from "./Images/owl-face-11.webp";
import {
  Wrapper,
  Row,
  Header,
  Image,
  Form,
  Search,
  Button,
} from "./components/styled/index";
import {Joke , Flags , Category} from "./common/types";

const base_Url = "https://v2.jokeapi.dev/joke/Any";

function App() {
  const [search, setSearch] = useState("");

  const [error, setError] = useState(false);
  const [jokes, setJokes] = useState<Joke[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const getJokes = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const endPoint = `${base_Url}?contains=${search}&amount=10`;

    const { data } = await axios.get(endPoint);
    console.log(data);

    if(data.error) {
      setError(true);
      setJokes([]);
    }
    else{
      setError(false);
      setJokes(data.jokes);
    }

    setSearch("");
  };

  return (
    <div className="App">
      <Wrapper>
        <Row>
          <Header>Joker</Header>
          <Image src={OwlImage} alt="Owl image" />
        </Row>
        <Form onSubmit={getJokes}>
          <Search
            type="text"
            placeholder="Search.."
            value={search}
            onChange={handleChange}
          />
          <Button type="submit">Submit</Button>
        </Form>

        {/* Jokes */}
        <div>
          {error && <p>Sorry, no jokes found</p>}
          {jokes.length > 0 && jokes.map((joke) => <JokeItem key={joke.id} joke={joke} />)}
        </div>
      </Wrapper>
    </div>
  );
}

export default App;
