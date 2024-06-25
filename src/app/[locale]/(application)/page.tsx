
import { Banner, BannerType } from "@/components/banner";
import { HomeContainer } from "@/components/home-container";
import { MatchBoard } from "@/components/matchboard";
import { getAdvertisament } from "@/http/advertisement";
import { getFixture } from "@/http/fixture";
import { getMyGuesses } from "@/http/gesses";
import { getLeagues } from "@/http/league";
import { getNews } from "@/http/new";
import { getRank } from "@/http/ranking";

export default async function LandingPage() {

    const fixtures =  await getFixture();
    const leagues = await getLeagues();
    const guess = await getMyGuesses();
    const news = await getNews();
    const rank = await getRank();
    const advertisament = await getAdvertisament();
    
    return (
        <HomeContainer > 
          {advertisament && (
            <Banner items={advertisament} />
          )}
          <MatchBoard fixtures={fixtures} leagues={leagues} guess={guess} news={news} rankings={rank}  />
        </HomeContainer>
    );
}


