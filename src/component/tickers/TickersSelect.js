import { useMemo, useState } from "react"
import tickersApi from "../../api/tickersApi"
import Modal from "../common/Modal"

const TickersSelect = ({opened, onClose, ticketsSelected, onTicketSelect, onTickerRemoved}) => {

    const [apiData, setApiData] = useState([])
    const [searchText, setSearchText] = useState('')
    const data = useMemo(() => apiData.map(x => ({
        ...x,
        selected: ticketsSelected.some(y => (y.tickerId === x.tickerId && y.exchage === x.exchage && y.region === x.region))
    })), [apiData, ticketsSelected])

    const search = async () => {
        const _data = await tickersApi.search('US', searchText)
        setApiData(_data)
    }

    const searchTextChange = ({target}) => {
        setSearchText(target.value)
    }

    return <Modal opened={opened} onClose={onClose} title="Selecionar Ticker">
        <div className="mb-3">            
            <input value={searchText} onChange={searchTextChange} type="text" className="form-control" placeholder="Procure por prefixo de ticker ou empresa"/>
        </div>        
        <button className="btn btn-primary" onClick={search}>Procurar Tickets</button>
        
        {data.map((x,i) => <div>
            {!x.selected && <><strong>{x.tickerId}</strong> - {x.companyName} <button className="btn btn-link text-success" onClick={() => onTicketSelect(x)}><strong>adicionar</strong></button></> }
            {x.selected && <><strong>{x.tickerId}</strong> - {x.companyName} <button className="btn btn-link text-danger" onClick={() => onTickerRemoved(x)}><strong>remover</strong></button></> }
        </div>)}
    </Modal>
}

export default TickersSelect