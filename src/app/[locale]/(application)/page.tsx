
import { Banner, BannerType } from "@/components/banner";
import { HomeContainer } from "@/components/home-container";
import { MatchBoard } from "@/components/matchboard";
import { getFixture } from "@/http/fixture";
import { getMyGuesses } from "@/http/gesses";
import { getLeagues } from "@/http/league";
import { getNews } from "@/http/new";
import { getRank } from "@/http/ranking";

export default async function LandingPage() {
    const mockBanner: BannerType[] = [
      {
        imageLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrEHRC5xHaiaOSTlILOCHRE8LRKuk57pkDZ3f-X00oZQ&s',
        redirectTo: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fexplosaotricolor.com.br%2Fcampeonato-brasileiro-2021-resultados-dos-jogos-de-sabado-da-25a-rodada-e-tabela-de-classificacao-atualizada%2F&psig=AOvVaw1hdhlevQP5_Dat_jPTgnRK&ust=1713983397125000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJDXr-_72IUDFQAAAAAdAAAAABAE'
      }
    ]
    const fixtures =  await getFixture();
    const leagues = await getLeagues();
    const guess = await getMyGuesses();
    const news = await getNews();
    const rank = await getRank();
    
    return (
        <HomeContainer > 
          <Banner items={mockBanner} />
          <MatchBoard fixtures={fixtures} leagues={leagues} guess={guess} news={news} rankings={rank}  />
        </HomeContainer>
    );
}


