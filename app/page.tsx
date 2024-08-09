import ImageSlider from "@/component/imageSlider";
import { getServerAuthSession } from "@/server/auth";

export default async function HomePage() {
  const session = await getServerAuthSession();
  console.log(session);
  const images = ["/slider/1.jpg", "/slider/2.jpg", "/slider/3.jpg"];
  return (
    <div>
    <ImageSlider/>
    </div>
  );
}
