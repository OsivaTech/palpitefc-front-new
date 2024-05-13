import { AdBanner, Banner } from "@/app/[locale]/(application)/components/AdBanner";
import { MainBoard } from "@/app/[locale]/(application)/components/MainBoard";
import { getFixture, getLeagues, getMyGuesses, getNews } from "@/app/[locale]/(application)/components/MainBoard/data";

export default async function LandingPage() {
  const mockBanner: Banner[] = [
    {
      imageLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrEHRC5xHaiaOSTlILOCHRE8LRKuk57pkDZ3f-X00oZQ&s',
      redirectTo: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fexplosaotricolor.com.br%2Fcampeonato-brasileiro-2021-resultados-dos-jogos-de-sabado-da-25a-rodada-e-tabela-de-classificacao-atualizada%2F&psig=AOvVaw1hdhlevQP5_Dat_jPTgnRK&ust=1713983397125000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJDXr-_72IUDFQAAAAAdAAAAABAE'
    }
  ]
  const fixtures =  await getFixture();
  const leagues = await getLeagues();
  const guess = await getMyGuesses();
  const news = await getNews();

  return (
    <>
      <div className="w-screen">
        <AdBanner banners={mockBanner}  />
      </div>
      <MainBoard fixtures={fixtures} leagues={leagues} guess={guess} news={news}  />
    </>
  );
}
