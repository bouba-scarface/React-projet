import { GetServerSideProps } from "next";
import { getDatabase } from "../../src/database";
import React from "react";

type Gametype = {
  name: string;
  cover: string;
  slug: string;
  price: number;
};
type GametypeProps = {
  data: Gametype[];
};

const platformBySlug = ({ data }) => {
  //console.log(data);
  return (
    <div className="container">
      <h1 className="text-center">Platform by slug</h1>

      <div className="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-4">
        {data.map((game, index) => {
          return (
            <div className="col" key={index}>
              <div className="card h-100">
                <img src={game.cover} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{game.name}</h5>
                  <p className="card-text d-md-flex justify-content-md-start fw-bold text-success">
                    {game.price / 100}
                  </p>
                </div>
                <div className="card-footer">
                  <a
                    href={`../games/${game.slug}`}
                    className="btn d-grid gap-2 col-6 mx-auto btn-outline-success "
                  >
                    See more!
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default platformBySlug;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mongodb = await getDatabase();

  const games = await mongodb
    .db()
    .collection("games")
    .find({ "platform.slug": context.params.platform_slug })
    .toArray();
  //console.log(games);
  const gameInfos = games.map((game) => {
    const img = game.cover === undefined ? "/img.png" : game.cover.url;
    return {
      name: game.name,
      cover: img,
      slug: game.slug,
      price: game.price,
    };
  });
  //console.log(gameInfos);
  return {
    props: {
      data: gameInfos,
    },
  };
};
