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

export async function login(email, senha){
    var data = await axios.post('https://services.lutti.tech/users/login', {email: email, senha: senha} )
    .then(function(response) {
        return response;
    })
        .catch(error => {
        return Promise.reject('Error in making login', error);
    });
    return data
};

// register new api 
export async function register(user){
    const body = user;
    const headers = {
        'Content-Type': 'application/json',
    };
    var data = await axios.post('https://services.lutti.tech/users/create', body, { headers })
        .then(({ data }) => {
        return data;
        })
        .catch(error => {
        return null;
    });
    return data;
};