import { GetServerSideProps } from "next";
import { getDatabase } from "../src/database";
import React from "react";
type panierType = {
  name: string;
  slug: string;
  cover: string;
  price: number;
};

type panierTypeProps = {
  data: panierType[];
};

const cart: React.FC<panierTypeProps> = ({ data }) => {
  console.log(data);
  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-evenly">
          <div className="text-success fs-4">Votre panier</div>
          <div className="text-black">Livraison</div>
          <div className="text-black">Paiement</div>
          <div className="text-black">Confirmation</div>
        </div>
        <br />
        <br />

        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col" className="text-black">
                Num
              </th>
              <th scope="col" className="text-back">
                Produit(s)
              </th>
              <th scope="col">Supprimer</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((game, index) => {
              if (index % 2 === 0) {
                return (
                  <tr>
                    <td>{index + 1}</td>

                    <td>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <img src={game.cover} alt="..." height="100rem" />
                        </div>
                        <div className="flex-grow-1 ms-3">{game.name}</div>
                      </div>
                    </td>
                    <td>
                      <form action="/delete" method="post">
                        <input
                          type="hidden"
                          name="slug"
                          value="{{ car.slug }}"
                        />
                        <button
                          type="submit"
                          className="btn btn-outline-secondary"
                        >
                          <i className="fas fa-trash-alt fs-6"></i>
                        </button>
                      </form>
                    </td>
                    <td>{game.price} €</td>
                  </tr>
                );
              } else {
                <tr className="table-active">
                  <td>{index + 1}</td>

                  <td>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <img src={game.cover} alt="..." height="100rem" />
                      </div>
                      <div className="flex-grow-1 ms-3">{game.name}</div>
                    </div>
                  </td>
                  <td>
                    <form action="/delete" method="post">
                      <input type="hidden" name="slug" value="{{ car.slug }}" />
                      <button
                        type="submit"
                        className="btn btn-outline-secondary"
                      >
                        <i className="fas fa-trash-alt fs-6"></i>
                      </button>
                    </form>
                  </td>
                  <td>{game.price} €</td>
                </tr>;
              }
            })}

            <tr>
              <th scope="row">3</th>
              <td colspan="2" className="table-active">
                Total
              </td>
              <td>00 €</td>
            </tr>
          </tbody>
        </table>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button type="button" className="btn btn-outline-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-cart-check"
              viewBox="0 0 16 16"
            >
              <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
            </svg>
            Valider mon panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default cart;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mongodb = await getDatabase();
  const paniers = await mongodb.db().collection("panier").find().toArray();
  //console.log(paniers);
  const panierInfos = paniers.map((panier) => {
    //const img = panier.cover === undefined ? "/img.png" : panier.cover.url;
    return {
      name: panier.name,
      slug: panier.slug,
      cover: panier.cover,
      price: panier.price,
    };
  });
  console.log(panierInfos);
  return {
    props: {
      data: panierInfos,
    },
  };
};
