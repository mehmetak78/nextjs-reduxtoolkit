const FIREBASE_AUTH_DOMAIN = 'https://identitytoolkit.googleapis.com/';

let url;

export const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  return adjExpirationTime - currentTime;
};

export const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  if (!storedToken) {
    return null;
  }

  const remainingTime = calculateRemainingTime(storedExpirationDate);
  if (remainingTime <= 3600) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    expirationTime: storedExpirationDate,
  };
};

export async function fetchAuth(userData) {

  let dataForFetch;

  switch (userData.authType) {
    case 'signup' : {
      url = FIREBASE_AUTH_DOMAIN + '/v1/accounts:signUp?key=AIzaSyCn0GxC6JsYFYptwMI3TFXMNn-Lr9mOPCQ';
      dataForFetch = {
        email: userData.username,
        password: userData.password,
        returnSecureToken: true
      }
      break;
    }
    case 'changepassword' : {
      url = FIREBASE_AUTH_DOMAIN + '/v1/accounts:update?key=AIzaSyCn0GxC6JsYFYptwMI3TFXMNn-Lr9mOPCQ';
      dataForFetch = {
        idToken: userData.token,
        password: userData.password,
        returnSecureToken: false
      }
      break;
    }
    case 'getuserdata' : {
      url = FIREBASE_AUTH_DOMAIN + '/v1/accounts:lookup?key=AIzaSyCn0GxC6JsYFYptwMI3TFXMNn-Lr9mOPCQ';
      dataForFetch = {
        idToken: userData.token,
      }
      break;
    }
    default : {
      url = FIREBASE_AUTH_DOMAIN + '/v1/accounts:signInWithPassword?key=AIzaSyCn0GxC6JsYFYptwMI3TFXMNn-Lr9mOPCQ';
      dataForFetch = {
        email: userData.username,
        password: userData.password,
        returnSecureToken: true
      }
      break;
    }
  }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(dataForFetch),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong ');
  }

  return data;
}
