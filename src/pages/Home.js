import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import tickersApi from "../api/tickersApi"
import TickersSelect from "../component/tickers/TickersSelect"


const Home = () => {

    const [selectTickersOpened, setSelectTickersOpened] = useState(false)
    const [tickersSelected, setTickersSelected] = useState([])
    const navigate = useNavigate()  

    useEffect(() => {
        tickersApi.getAllAttachments().then((result) => {
            setTickersSelected(result)
        })   
        
        updateMarketValues()
        const intervalId = setInterval(updateMarketValues, 20 * 1000)

        return () => clearInterval(intervalId)
        
    },[])

    const updateMarketValues = () => {

        const update = (values) => {
            setTickersSelected(_data => {
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
    

    const companies = useMemo(() => tickersSelected.reduce((acumulator, current) => {
        const company = acumulator.find(x => x.companyName === current.companyName) || {companyName: current.companyName, tickers: []}
        company.tickers.push({...current})

        return [...acumulator.filter(x => x.companyName !== current.companyName), company]
    }, []), [tickersSelected])

    const atach = async (itemSelected) => {
        await tickersApi.atach(itemSelected)
        setTickersSelected((x) => [...x, itemSelected])

        updateMarketValues()
    }

    const detach = async (itemSelected) => {
        await tickersApi.remove(itemSelected.tickerId, itemSelected.region)
        setTickersSelected((x) => [...x.filter(y => !(y.tickerId === itemSelected.tickerId && y.exchage === itemSelected.exchage && y.region === itemSelected.region))])
    }

    const moreDetails = (tickerId, region) => {
        navigate(`/ticker/${tickerId}/${region}`)
    }

    const removeItem = async (tickerId, region) => {
        await tickersApi.remove(tickerId, region)

        setTickersSelected((x) => [...x.filter(y => !(y.tickerId === tickerId && y.region === region))])
    }

    const formatValue = (value) => {
        let newValue = parseFloat(value).toFixed(2)

        return newValue.toString()
    }

    return <>
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                
                <button className="btn btn-primary" onClick={() => setSelectTickersOpened(true)}>Adicionar Tickers</button>
            </div>
        </nav>
        <h1 className="text-center m-5">Mercado</h1>
        <div className="row my-4 justify-content-center">
            {companies.length !== 0 && companies.map((x,i)=>{
                return(
                    <div key={i} className="card text-center col-lg-4 col-sm-6 m-1 my-2">
                        <div className="card-header fw-bold">
                            {x.companyName}
                        </div>
                        <div className="card-body">
                            <h5 className="text-center">Tickers</h5>
                            {x.tickers.map((y, i)=>{
                                return (
                                    <div className="card">
                                        <button className="btn btn-link" type="button" onClick={() => moreDetails(y.tickerId,y.region)} >
                                            <div className="card-header"> {y.tickerId} </div>
                                        </button>
                                        <div className="card-body">
                                            <p> Preço Atual: {formatValue(y.currentPriceValue)} </p>
                                            <p> Preço Variação: {formatValue(y.changePercentValue)}% </p>
                                        </div>
                                        <button onClick={() => removeItem(y.tickerId,y.region)} className="btn btn-secondary">Excluir</button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>

        <TickersSelect 
            ticketsSelected={tickersSelected}
            onTickerRemoved={detach} 
            onTicketSelect={atach} 
            opened={selectTickersOpened} 
            onClose={() => setSelectTickersOpened(false)}
        />
            
    </>
}

export default Home