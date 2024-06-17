import { options } from "./constants";

const createPlaceholderData = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `placeholder-${index}`,
    title: "  ",
    poster_path: null,
  }));
};

const handleMoviePress = async (router, setLoading, item) => {
  setLoading(true);
  try {
    const detailsUrl = `https://api.themoviedb.org/3/movie/${item.id}?language=en-US`;
    const creditsUrl = `https://api.themoviedb.org/3/movie/${item.id}/credits?language=en-US`;
    const recsUrl = `https://api.themoviedb.org/3/movie/${item.id}/recommendations?language=en-US`;
    const responses = await Promise.all([
      fetch(detailsUrl, options),
      fetch(creditsUrl, options),
      fetch(recsUrl, options),
    ]);
    const [detailsResponse, creditsResponse, recsResponse] = responses;
    const detailsJson = await detailsResponse.json();
    const credJson = await creditsResponse.json();
    const recsJson = await recsResponse.json();
    const creditsJson = credJson.cast.sort((a, b) => b.rank - a.rank).slice(0, 10);
    setLoading(false);
    router.push({
      pathname: "movieDetail",
      params: {
        deets: JSON.stringify(detailsJson),
        creds: JSON.stringify(creditsJson),
        recs: JSON.stringify(recsJson),
      },
    });
  } catch (error) {
    console.error("Error fetching movie details:", error);
    setLoading(false);
  }
};

const handleTvPress = async (router, setLoading, item) => {
  setLoading(true);
  try {
    const detailsUrl = `https://api.themoviedb.org/3/tv/${item.id}?language=en-US&append_to_response=credits,recommendations,external_ids`;
    const response = await fetch(detailsUrl, options);
    const responseJson = await response.json();
    setLoading(false);
    router.push({
      pathname: "seriesDetail",
      params: {
        deets: JSON.stringify(responseJson),
      },
    });
  } catch (error) {
    console.error("Error fetching tv details:", error);
    setLoading(false);
  }
};

export { createPlaceholderData, handleMoviePress, handleTvPress };
