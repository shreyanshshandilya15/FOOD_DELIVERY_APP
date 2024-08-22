import { useEffect, useState } from "react"
import Card from "../components/card/Card"
import Footer from "../components/footer/Footer"
import Navbar from "../components/navbar/Navbar"
import Burgerimage from "../images/burger.jpg";
import Pizzaimage from "../images/pizza.jpg";
import Biryaniimage from "../images/biryani.jpg";

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodProduct, setFoodProduct] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  try{
  const getdata = async () => {
    let response = await fetch("http://localhost:4000/api/v1/displayfood", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
   console.log(response);
    setFoodProduct(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    getdata();
  }, []);
}
  catch(erro){
    console.log("error");
  }
  
  return (
    <div>
      <div ><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "20" }}>
              <div className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
            <div className="carousel-item active">
              <img src={Burgerimage}className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "cover", height:"70vh"}} alt="..." />
            </div>
            <div className="carousel-item">
              <img src={Pizzaimage} className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "cover",height:"70vh" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src={Biryaniimage} className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "cover" , height:"70vh"}} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container" >
        {
          foodCat!=[] ?
            foodCat.map((cat) => {
              return (
                <div className=' row mb-3' key={cat._id}>
                  <div className="fs-3">{cat.CategoryName}</div>
                  <hr />
                  {foodProduct != [] ?
                    foodProduct?.filter((item) => (item.CategoryName == cat.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                      ?.map(filteritem => {
                        return (
                          <div key={filteritem._id} className='col-12 col-md-4 col-lg-3'>
                            <Card
                              fooditems={filteritem}
                              selector={filteritem.options}
                            />
                          </div>
                        )
                      })
                    :
                    <div>hehehhe</div>
                  }
                </div>
              )
            })
            :
            <div>no such data exists</div>
        }
      </div>
      <div><Footer /></div>
    </div>
  )
}
