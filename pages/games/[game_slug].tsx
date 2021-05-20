import { GetServerSideProps } from "next";
import { getDatabase } from "../../src/database";
import React from "react";

type Gametype = {
  name: string;
  cover: string;
  summary: string;
  price: number;
};
type GametypeProps = {
  data: Gametype[];
};

const gameBySlug = ({ data }) => {
  //console.log(data);
  return (
    <div>
      <div className="container">
        <div className="card mb-3 mt-4">
          <div className="row g-0">
            <div>
              <img src={data[0].cover} alt="..." />
            </div>
            <div className="col-md-12">
              <div className="card-body">
                <h5 className="card-title">{data[0].name}</h5>
                <p className="card-text">{data[0].summary}</p>
                <p className="card-text text-success fw-bold">{data[0].price / 100}€</p>

                <form method="post" action="/cart">
                  <button
                    value={data[0].slug}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    type="button"
                    className="btn btn-outline-success d-flex m-auto"
                  >
                    ajouter au panier
                  </button>
                </form>

                <div
                  className="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                          Votre article a été ajouté à votre panier
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p>
                          <img
                            src={data[0].cover}
                            alt=""
                            className="d-flex m-auto"
                          />
                        </p>
                        <p className="fs-2">{data[0].name}</p>
                        <p className="text-success fw-bold">{data[0].price / 100} €</p>
                      </div>
                      <div className="modal-footer">
                        <a
                          href="/games"
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          continuer mes achats
                        </a>
                        <a
                          href="/cart"
                          type="button"
                          className="btn btn-outline-success"
                        >
                          voir mon panier
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default gameBySlug;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mongodb = await getDatabase();
  const games = await mongodb
    .db()
    .collection("games")
    .find({ slug: context.params.game_slug })
    .toArray();
  console.log(games);
  const gameInfos = games.map((game) => {
    const img = game.cover === undefined ? "/img.png" : game.cover.url;
    return {
      name: game.name,
      cover: img,
      summary: game.summary,
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
