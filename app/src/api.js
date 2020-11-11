import axios from 'axios';

export const doPayment = (amount, tokenId, accessToken) => {
    console.log('token ',tokenId)
    const body = {
        amount: amount,
        token: tokenId,
        currency: 'BRL'
    };
    const headers = {
        'Content-Type': 'application/json',
    };
    return axios
    //https://us-central1-lutti-5e0ef.cloudfunctions.net/payWithStripe/
        .post('http://192.168.0.3:5000/lutti-5e0ef/us-central1/chargeWithCustomer', body, { headers })
        .then(({ data }) => {
        console.log('data ',data)
        return data;
        })
        .catch(error => {
        return Promise.reject('Error in making payment', error);
    });
};

export async function login(number){
    var data = await axios.get('https://lutti-5e0ef.firebaseio.com/user.json?orderBy="number"&equalTo="'+number+'"&print=pretty')
        .catch(error => {
        return Promise.reject('Error in making login', error);
    });
    return data
};

export async function register(user){
    const body = user;
    const headers = {
        'Content-Type': 'application/json',
    };
    var data = await axios.post('https://lutti-5e0ef.firebaseio.com/user.json', body, { headers })
        .then(({ data }) => {
        return data;
        })
        .catch(error => {
        return null;
    });
    return data;
};