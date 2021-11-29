import { API } from '../config';
import queryString from 'query-string'
 

export const getBirds = () => {
    return fetch(
        `${API}/bird/birds`,
        {
            method: 'GET'
        }
    )
        .then(response => {
            console.log(response)
            return response.json()
        })
        .catch(err => console.log(err));
}

export const read = (birdId) => {
    return fetch(`${API}/bird/${birdId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))

}

export const signin = user => {
    return fetch(`${API}/auth/signin`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user) // convierte los datos que se ingresó a JSON, ejemplo: user: {"name": "Arturo", "password": "Test123"}
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
};


export const signup = user => {
    return fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/json', 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
};


export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
}


export const signout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/auth/signout`, {
            method: 'GET',
        })
            .then(response => {
                console.log('signout', response);
            })
            .catch( err => console.log(err));
    }
}



export const isAuthenticated = () => {
    if(typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
        //return localStorage.getItem('jwt')
    }
        return false;
    
}


// ${userId} `${API}/category/create/${userId}`
export const createBird = (token, bird) => {
    return fetch(`${API}/bird/create/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: bird
    })
        .then( response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}


// Eliminar una especie
export const deletedBird = (birdId) => {
    return fetch(`${API}/bird/${birdId}`, {
    method: "DELETE"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
  }
