import './Card.scss'

export default function Card() {
    return (
        <div className='Card'>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "370px" }}>
                <img src="https://source.unsplash.com/random/30×30/?food" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card content.</p>
                    <div className="d-inline container w-100 ">
                        <select className='h-100 rounded bg-success'>
                            {Array.from(Array(6), (i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                    </div>
                    <select className='m-2 h-100 rounded bg-success'>
                        <option value="half">Half</option>
                        <option value="full">Full</option>
                    </select>

                    <div className='d-inline h-100 fs-5'>
                        Total Price
                    </div>
                </div>
            </div>
        </div>
    )
}
