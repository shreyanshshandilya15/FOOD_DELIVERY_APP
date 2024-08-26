import Footer from "../components/footer/Footer"
import Navbar from "../components/navbar/Navbar"
import { useState ,useEffect} from "react"

export default function MyOrder() {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'));
        try{
          await fetch("https://food-delivery-app-byh4.onrender.com/api/v1/myorderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            console.log(response);

            await setorderData(response);
        })
        }catch(err){
          console.log(err);
        }
       
        // await res.map((data)=>{
        //    console.log(data)
        // })
    }

    useEffect(() => {
        fetchMyOrder()
    }, []);


    return (
      <div>
      <div>
          <Navbar />
      </div>

      <div className='container'>
          <div className='row'>
          
          {orderData != {} ? (
            Array(orderData).map((data) => {
              return (
                <>
                  {data.orderData && data.orderData.order_data.length > 0 ? (
                    data.orderData.order_data.slice(0).reverse().map((item) => {
                      // Assuming each 'item' in order_data is an array
                      return item.map((arrayData) => ( // directly iterate through arrayData
                        <div key={arrayData._id}>
                          {arrayData.order_date ? (
                            <div className="m-auto mt-5">
                             {data=arrayData.order_date}
                              <hr />
                            </div>
                          ) : 
                          <div className="col-12 col-md-6 col-lg-3">
                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                              <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                              <div className="card-body">
                                <h5 className="card-title">{arrayData.name}</h5>
                                <div className="container w-100 p-0" style={{ height: "38px" }}>
                                  <span className="m-1">{arrayData.qty}</span>
                                  <span className="m-1">{arrayData.size}</span>
                                  <div className="d-inline ms-2 h-100 w-20 fs-5">₹{arrayData.price}/-</div>
                                </div>
                              </div>
                            </div>
                          </div>
                    }
                        </div>
                      ));
                    })
                  ) : (
                    <p>You did not place any order till now!</p>
                  )}
                </>
              );
            })
          ) : (
            "You did not placed any order till now !"
          )}

          </div>
      </div>

      <Footer />
  </div>
    )
}

