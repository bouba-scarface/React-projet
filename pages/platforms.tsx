import { getDatabase } from "../src/database";
import { GetServerSideProps } from "next";
import React from "react";
type Platformtype = {
  name: string;
  platform_logo_url: string;
  slug: string;
};
type PlatformtypeProps = {
  data: Platformtype[];
};

const myPlatform: React.FC<PlatformtypeProps> = ({ data }) => {
  //console.log(data);
  //data.length
  return (
    <div className="container">
      <h1 className="text-center">Platforms</h1>

      <div className="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-4">
        {data.map((platform, index) => {
          return (
            <div className="col" key={`${platform.name}-${index}`}>
              <div className="card h-100">
                <img
                  src={platform.platform_logo_url}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{platform.name}</h5>
                  <p className="card-text d-md-flex justify-content-md-start fw-bold text-success">
                    stock(nb)
                  </p>
                </div>
                <div className="card-footer">
                  <a
                    href={`platforms/${platform.slug}`}
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

export default myPlatform;

export const getServerSideProps: GetServerSideProps = async () => {
  const mongodb = await getDatabase();
  const platformsInfos = await mongodb
    .db()
    .collection("games")
    .find()
    .toArray();
  //console.log(platforms);
  const gameInfos = platformsInfos.map((platform) => {
    return {
      name: platform.platform.name,
      platform_logo_url: platform.platform.platform_logo_url,
      slug: platform.platform.slug,
    };
  });
  //trie
  const platforms: Platformtype[] = [];
  gameInfos.forEach((game) => {
    const platform = platforms.find((platform) => platform.slug === game.slug);
    if (!platform) {
      platforms.push(game);
    }
  });
  //nb game for platform
  let tab: number[] = [];
  const nb = platforms.map((platform, index) => {
    let nbPlat = mongodb
      .db()
      .collection("games")
      .find({ "platform.slug": platform.slug })
      .toArray()
      .then((nb) => {
        tab[index] = nb.length;
        //console.log(nb.length);
      });
    console.log(tab);
  });

  console.log(tab);
  return {
    props: {
      data: platforms,
    },
  };
};
