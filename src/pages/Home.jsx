import Card from "../components/card/Card"
import Carousel from "../components/carousel/Carousel"
import Footer from "../components/footer/Footer"
import Navbar from "../components/navbar/Navbar"

export default function Home() {
  
  
  return (
    <div>
        <div ><Navbar/></div>
        <div><Carousel /></div>
        <div className="m-3 d-flex flex-wrap gap-5 " >
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
        <div><Footer /></div>
    </div>
  )
}
