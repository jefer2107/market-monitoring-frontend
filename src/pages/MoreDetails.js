import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import tickersApi from "../api/tickersApi"
import "./MoreDetails.css"


const MoreDetails = () => {
    const [ticker, setTicker] = useState([])
    let {tickerId, region} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        tickersApi.getTicker(tickerId, region).then((result)=>{
            setTicker(result)
        })

        updateMarketValues()
        const intervalId = setInterval(updateMarketValues, 20 * 1000)

        return () => clearInterval(intervalId)

    },[])

    const returnPage = ()=>{
        navigate("/")
    }

    const updateMarketValues = () => {

        const update = (values) => {
            setTicker(_data => {
                const result = _data.map(x => {
    
                    const tickerMarketValue = values.find(v => v.tickerId === x.tickerId && v.region === x.region)
                    return ({
                        ...x,
                        ...tickerMarketValue
                    })
                })
    
                return [...result]
            })
        }

        tickersApi.getMarketValues()
                .then(x => update(x))
    }

    const formatValue = (value) => {
        let newValue = parseFloat(value).toFixed(2)

        return newValue.toString()
    }

    return(
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    
                    <button className="btn btn-primary" onClick={() => returnPage()}>Retornar</button>
                </div>
            </nav>
            <div className="list client-data container-fluid my-4">
                <h1 className="text-center m-5"> {ticker.lenght !== 0 && ticker[0]?.companyName} </h1>
                <div className="row">
                    <div class="card col-lg-12 list-ticker">
                        <div class="card-body">
                            <table className="container-fluid">
                                <thead className="text-center">
                                    <tr>
                                        <td>TICKER</td>
                                        <td>BOLSA</td>
                                        <td>PREÇO ATUAL</td>
                                        <td>VARIAÇÃO</td>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    <tr>
                                        <td>{ticker.lenght !== 0 && ticker[0]?.tickerId}</td>
                                        <td>{ticker.lenght !== 0 && ticker[0]?.exchage}</td>
                                        <td>{ticker.lenght !== 0 && formatValue(ticker[0]?.currentPriceValue)}</td>
                                        <td>{ticker.lenght !== 0 && formatValue(ticker[0]?.changePercentValue)}%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoreDetails