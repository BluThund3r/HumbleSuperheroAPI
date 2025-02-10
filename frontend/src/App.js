import "./App.css";
import TopBar from "./components/TopBar";
import HeroContainer from "./components/HeroContainer";
import { useEffect, useState } from "react";
import { getHeroes } from "./services/heroService";
import { Toaster } from "react-hot-toast";

function App() {
  const [heroList, setHeroList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [dummy, setDummy] = useState(false);

  const refresh = () => setDummy(!dummy);

  const fetchData = async () => {
    const heroes = await getHeroes();
    setHeroList(heroes);
    setLoaded(true);
  };

  useEffect(() => {
    fetchData();
  }, [dummy]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="app">
        <TopBar refreshHeroes={refresh}></TopBar>
        {loaded ? (
          heroList.length > 0 ? (
            <HeroContainer heroes={heroList}></HeroContainer>
          ) : (
            <div className="message">No heroes</div>
          )
        ) : (
          <div className="message">Loading...</div>
        )}
      </div>
    </>
  );
}

export default App;
