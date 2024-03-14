import './Card.scss'
import { useCart, useDispatchCart } from '../ContextReducer';
import { useState ,useRef,useEffect} from 'react';

export default function Card({ fooditems, selector }) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef=useRef();
    const priceoptions = Object.keys(selector[0]) || [];
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const handleaddtocart = async () => {
        let food=[]
        for(const item of data){
            if(item.id==fooditems._id){
               food=item;
               break;
            }
        }
        if(food!=[]){
            if(food.size==size){
                await dispatch({type:"UPDATE",id:fooditems._id,price:finalprice,qty:qty})
                return
            }else if(food.size!=size){
                await dispatch({ type: "ADD", id: fooditems._id, name: fooditems.name, qty: qty, size: size, price: finalprice })
           return
            }
            return
        }
        await dispatch({ type: "ADD", id: fooditems._id, name: fooditems.name, qty: qty, size: size, price: finalprice })
    }
    let finalprice=qty*parseInt(selector[0][size]);

    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])

    return (
        <div className='Card'>
            <div className="card mt-4" style={{ "width": "18rem", "maxHeight": "400px" }}>
                <img src={fooditems.img} style={{ "maxHeight": "150px", "objectFit": "cover" }} className="card-img-top " alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{fooditems.name}</h5>
                    <p className="card-text">{fooditems.description}</p>
                    <div className="d-inline container w-100 ">
                        <select className='h-100 rounded bg-success' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (_, i) => {
                                return (
                                    <option key={`number-${i + 1}`} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                    </div>

                    <select ref={priceRef} className='mb-2h-100 rounded bg-success' onChange={(e) => setSize(e.target.value)}>  
                     {priceoptions.map((item) => {
                            return <option key={item} value={item}>{item}</option>
                        })} 
                    </select>

                    <div  className='d-inline m-2 h-100 fs-5'>
                       {finalprice}/-
                    </div>
                </div>
                <button className="btn btn-success justify-center mb-2 me-2 mx-2 " onClick={handleaddtocart}>Add to Cart</button>
            </div>
        </div>
    )
}
