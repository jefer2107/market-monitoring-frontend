import axios from 'axios'

const search = async (region, search) => axios.get(`http://localhost:3002/tickers?q=${search}&region=US`).then(x => x.data)

const atach = async (tickers) => {

    await axios.post(`http://localhost:3002/tickers/attachments`,tickers)
}

const getAllAttachments = async () => axios.get(`http://localhost:3002/tickers/attachments`).then(x => x.data)

const getMarketValues = async () => axios.get(`http://localhost:3002/tickers/marketValues`).then(x => x.data)

const getTicker = async (tickerId,region) => axios.get(`http://localhost:3002/ticker/?q=${tickerId}&region=${region}`).then(x => x.data)

const remove = async (tickerId,region) => axios.delete(`http://localhost:3002/ticker/?q=${tickerId}&region=${region}`)



export default {
    search,
    atach,
    getAllAttachments,
    getMarketValues,
    getTicker,
    remove
}