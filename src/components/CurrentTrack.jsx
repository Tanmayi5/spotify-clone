import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import axios from "axios";

export default function CurrentTrack() {
  // console.log("Entering into current track");
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentTrack = async () => {
      console.log("Executiing asyn");
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response from currrent trac", response);
      if (response.data !== "") {
        const { item } = response.data;
        const currentlyPlaying = {
          id: item.id,
          name: item.name,
          artists: item.artists.map((artist) => artist.name),
          image: item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      }
      //   console.log(playlists);
    };
    getCurrentTrack();
  }, [token, dispatch]);
  return (
    <Container>
      {currentlyPlaying && (
        <div className="track" key={currentlyPlaying.id}>
          <div className="track__image">
            <img src={currentlyPlaying.image} alt="currentlyPlaying" />
          </div>
          <div className="track__info">
            <h4>{currentlyPlaying.name}</h4>
            <h6>{currentlyPlaying.artists.join(", ")}</h6>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__image {
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      h4 {
        color: white;
      }
      h6 {
        color: #b3b3b3;
      }
    }
  }
`;
